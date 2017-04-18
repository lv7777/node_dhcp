var debug={}
var cst2=require("./const.js")

/**
 * 解析後のdhcpメッセージをもっとわかりやすくして出力する
 * @param {object} msg util.jsのparseDHCPに通して解析
 * @param {boolean} flag 1の場合、オプション等も表示
 */
debug.print=function(msg,flag){
    console.log("------DHCP----------")
    console.log(`opcode: ${msg.opcode}(${cst2.opcode[msg.opcode]})`)
    console.log(`HWaddress type: ${msg.HWid}(${cst2.hwtype[msg.HWid]})`)
    console.log(`HW length: ${msg.HWlen}`)
    console.log(`HopCount: ${msg.hopcount}`)
    console.log(`Transaction ID: ${msg.transactionID}`)
    console.log(`Broadcast Flag: ${msg.flag}(${cst2.flagState[msg.flag]})`)
    console.log(`seconds: ${msg.second}`)
    console.log(`Client IP: ${msg.clientIP}(${tes(msg.clientIP)})`)
    console.log(`Your IP: ${msg.nextSettingIP}(${tes(msg.nextSettingIP)})`)
    console.log(`Server IP: ${msg.serverIP}(${tes(msg.serverIP)})`)
    console.log(`Next DHCP Server IP: ${msg.GWIP}(${tes(msg.GWIP)})`)
    console.log(`MAC Address: ${msg.mac}`)
    console.log(`Server Host Name: ${msg.hostname}`)
    console.log(`Boot File Path: ${msg.bootfile}`)

    console.log(`----option-----`)
    //obj.option
    // for(key in msg.option){
    //     // オプション番号35(DHCPタイプ): 3(DHCP Discover)
    //     console.log(`${key} (${optionarr[key]}): ${msg.option[key]}(${optiontypename[key]})`)
    // }
}

function tes(ip16){
    return ((ip16>>>24)+"."+(ip16>>16&0xFF)+"."+(ip16>>8&0xFF)+"."+(ip16>>4&0xFF))
}

module.exports=debug