var util={}
const os=require("os")

/** udpのパケットをパースして部分ごとにobjectのプロパティに分けます。
 *  @param {Buffer} buffer parseする本体
 *  @return {Object} パースした奴。obj.opcodeなどで見れる。
 */
util.parseDHCP=(buffer)=>{
    const obj={
        opcode:buffer[0],
        HWid:buffer[1],
        HWlen:buffer[2],
        hopcount:buffer[3]
    }
    //const ByteOrder=os.endianness()
    //if(ByteOrder == "LE"){////////////////////////////パケット読み書きするときはendinanness関係ない？
        ///パケット読むときは来た順に解析すればいいだけ。つまりbig endianness
        obj.transactionID=buffer.readUInt32BE(4)
        obj.flag=buffer.readUInt16BE(8)
        obj.second=buffer.readUInt16BE(10)
        obj.clientIP=buffer.readUInt32BE(12)
        obj.nextSettingIP=buffer.readUInt32BE(16)
        obj.serverIP=buffer.readUInt32BE(20)
        obj.GWIP=buffer.readUInt32BE(24)
        obj.mac=readmac(buffer,28,6)
        obj.hostname=0
        obj.bootfile=0
        //TODO: bootfile,hostnameをちゃんと読み込む

        obj.isDHCP=util.isDHCP(buffer)
        
        //可変長ヘッダのパース
        if(obj.isDHCP){
            parseOption(buffer,240,obj)
        }
    //}else{
    //    console.log("BE")
    //}
    
    //可変長ヘッダがある場合
    

    return obj
}

/**
 * Macアドレスの形にパースします(文字列)
 * @param {Buffer} buffer wanto read mac buffer
 * @param {Number} [offset] offset for start
 * @param {Number} [num] loopindex
 * @return {string} macstring
 */
function readmac( buffer,offset = 28,num = 6 ){
    var str=""
    var i=0
    while(num-i){
        if(num-i === 1){
            str+=(buffer.readUInt8(offset+i)).toString(16).toUpperCase()
        }else{
            str+=(buffer.readUInt8(offset+i)).toString(16).toUpperCase()+":"
        }
        i++
    }
    return str
}

function readhost(buffer,offset=44,num=64){
    //TODO: implement
}

/**
 * 可変オプションをパースして引数で渡されたオブジェクトにつけます。
 * @param {buffer} buffer 解析したいバッファ
 * @param {number} [offset] 解析位置。デフォルトは240(固定ヘッダ＋DHCPマジッククッキー)
 * @param {Object} obj 解析後の結果をつけたしたいオブジェクト
 * @return {boolean} 可変オプションがあったかどうか
 */
function parseOption(buffer,offset = 240,obj){
    //optionはtype,length,valueの順。

    //Mapは任意の値をキーに取れるので神
    var typemap=new Map()
    var type=0,length=0,value=[]

    type=buffer.readUInt8(offset)

     while(type !== 0xFF && offset < 1000){
         offset++
         length = buffer.readUInt8(offset)
         //offset++
            for(var i=1;i<=length;i++){
                value.push(buffer.readUInt8(offset+i))//+1はlength分、iはvalueの読み込み位置
            }
        typemap.set(type,value)
        value=[]
        offset+=(length+1)//lengthの値だけだったらvalueの最後の位置を読み取ってしまうからね・・・
    //console.log(offset+" is "+type.toString(16).toUpperCase()+" \n")
    //console.log("and the length is"+length+" ,value is "+value+"\n")
        //んでlengthのoffset分は前で++してるから。
         type = buffer.readUInt8(offset)
     }
     obj.option=typemap
     //typemap.forEach(logMapElements);
     return typemap.size ? true : false 
}

function logMapElements(value, key, map) {
    console.log("m[" + key + "] = " + value)
}

/**
 * DHCPかどうかを判断します。
 * @param {Buffer} buffer buffer
 * @return {Bool} isDHCP
 */
util.isDHCP=(buffer)=>{
    const DHCP_MAGIC_COOKIE = 0x63825363
    //console.log(buffer.readUInt32BE(236).toString(16))
    //console.log(buffer.readUInt32BE(236) === 0x63825363)
    return buffer.readUInt32BE(236) === DHCP_MAGIC_COOKIE ? 1 : 0
}

/**
 * 
 * rinfoの送信先ipからそれがどこのIFのIPか特定してmacアドレスを返します
 * @param {Object} rinfo udpでソケットをバインドしてmessageが送られてきた時のrinfoを入れる
 */
util.getInterfaces=(rinfo)=>{
    const nwif=os.networkInterfaces()
    for(var key in nwif){
        //console.log(key)
        //console.log(nwif[kwy][0])
        for(var inner of nwif[key]){//配列なのでofで取り出す
            if(inner.family == rinfo.family){
                if(inner.address == rinfo.address){
                    console.log("found!!")
                    return inner.mac
                }else{
                    console.log("it is ipv4 family but, not same ip")
                }
            }
        }
    }
}


// //tidとipアドレスのマップ
// util.DB=new Map()

/////////////////////////////////////DHCP リース延長リクエストの可能性もあるため削除。代わりにそのネットワークでそのIPが使用されてるかどうかで判断↓
// /**
//  * DHCP requestが来たとき、トランザクションIDがすでに発行されておりそれが正当かどうかを判断する。
//  * @param {num} TID トランザクションID
//  * @return {bool} 正当ならtrue,偽装されている場合false
//  */
// util.validTransaction=(TID,ip)=>{
//     util.DB.forEach((value,key,map)=>{
//         if(key == TID && value == ip){
//             console.log("this request is valid!")
//             return true
//         }else if(key == TID){
//             console.log("TIDは発行済みですがvalueは偽装されてますね・・・")
//         }else if(value == ip){
//             console.log("ipは正しいんだけどTIDが偽装されてる・・・")
//         }
//     })
//     console.log("トランザクションIDもIPアドレスも偽装されてますねぇ・・・")
//     return false
// }

//数値で判断。
util.iparr=[]
/**
 * @param {int} ip ipアドレス
 * @example util.isUsed(0xc0a80101) -> false
 * @return {bool} 使われてなかったらtrue。
 */
util.isUsed=(ip)=>{
    for(var i of util.iparr){
        //ipアドレスがかぶっています。
        if(i == ip){
            return true
        }
    }
    return false
}

module.exports=util