var util={};

/** @param {new Buffer} buffer parseする本体
 *  @return {Object} パースした奴。obj.opcodeなどで見れる。
 *
 */
util.parseDHCP=(buffer)=>{
    const obj={}
    obj.opcode=buffer[0]
    return obj
}

module.exports=util