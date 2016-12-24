var util={};
const os=require("os")

/** @param {new Buffer} buffer parseする本体
 *  @return {Object} パースした奴。obj.opcodeなどで見れる。
 *
 */
util.parseDHCP=(buffer)=>{
    const obj={
        opcode:buffer[0],
        HWid:buffer[1],
        HWlen:buffer[2],
        hopcount:buffer[3]
    }
    const ByteOrder=os.endianness()
    if(ByteOrder == "LE"){
        obj.transactionID=buffer.readUInt32LE(4)
        obj.flag=buffer.readUInt16LE(8)
        obj.second=buffer.readUInt16LE(10)
        obj.clientIP=buffer.readUInt32LE(12)
        obj.nextSettingIP=buffer.readUInt32LE(16)
        obj.serverIP=buffer.readUInt32LE(20)
        obj.GWIP=buffer.readUInt32LE(24)
        obj.mac=readmac(buffer,28,6)
        obj.hostname=0
        obj.bootfile=0
        //TODO: bootfile,hostnameをちゃんと読み込む

        obj.isDHCP=util.isDHCP(buffer)
        
        //可変長ヘッダのパース
        if(obj.isDHCP){
            parseOption(buffer,240,obj)
        }
    }else{
        console.log("BE")
    }
    
    //可変長ヘッダがある場合
    

    return obj
}

/**
 * Macアドレスの形にパースします(文字列)
 * @param {Buffer} buffer wanto read mac buffer
 * @param {number} offset offset for start
 * @param {number} num loopindex
 * @return {string} macstring
 */
function readmac( buffer,offset = 28,num = 6 ){
    var str="";
    var i=0;
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
 * @param {buffer} buffer 解析したいバッファ
 * @param {number} offset 解析位置。デフォルトは240(固定ヘッダ＋DHCPマジッククッキー)
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
    console.log("m[" + key + "] = " + value);
}

/**
 * @param {Buffer} buffer buffer
 * @return {Bool} isDHCP
 */
util.isDHCP=(buffer)=>{
    //神の力
    const DHCP_MAGIC_COOKIE = 0x63825363
    //console.log(buffer.readUInt32BE(236).toString(16))
    //console.log(buffer.readUInt32BE(236) === 0x63825363)
    return buffer.readUInt32BE(236) === DHCP_MAGIC_COOKIE ? 1 : 0
}

module.exports=util