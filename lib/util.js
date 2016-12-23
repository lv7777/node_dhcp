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
    console.info(`os architecture is ${ByteOrder}`)
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
            str+=(buffer.readUInt8(28+i)).toString(16).toUpperCase()
        }else{
            str+=(buffer.readUInt8(28+i)).toString(16).toUpperCase()+":"
        }
        i++
    }
    return str
}

module.exports=util