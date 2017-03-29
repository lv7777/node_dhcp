var debug={}

const opcode=["DHCP Request","DHCP Reply"]

//last is 37//38-255 is unasigned, 65535 is reserved
//chaosの定義は２つある。一つはイーサネットの種類、もう一つはプロトコルのタイプ
const hwtype=["Reserved " , "Ethernet (10Mb)  " , "Experimental Ethernet (3Mb) " , "Amateur Radio AX.25 " , "Proteon ProNET Token Ring " , "Chaos " , "IEEE 802 Networks " , "ARCNET " , "Hyperchannel " , "Lanstar " , "Autonet Short Address " , "LocalTalk " , "LocalNet (IBM PCNet or SYTEK LocalNET) " , "Ultra link " , "SMDS " , "Frame Relay " , "Asynchronous Transmission Mode (ATM) " , "HDLC " , "Fibre Channel " , "Asynchronous Transmission Mode (ATM) " , "Serial Line " , "Asynchronous Transmission Mode (ATM) " , "MIL-STD-188-220 " , "Metricom " , "IEEE 1394.1995 " , "MAPOS " , "Twinaxial " , "EUI-64 " , "HIPARP " , "IP and ARP over ISO 7816-3 " , "ARPSec " , "IPsec tunnel " , "InfiniBand (TM) " , "TIA-102 Project 25 Common Air Interface (CAI) " , "Wiegand Interface " , "Pure IP " , "HW_EXP1 " , "HFI "]

const flagState=["OFF","ON"]


const optionname={
    1:"Subnet Mask",
    3:"Default Gateway"
}
//option 120 is undefined but I defined easter egg!
const optiontypename={
    35:{

    },
    120:{
        1:"hello!",
        114514:"1919810"
    }
}

/**
 * 解析後のdhcpメッセージをもっとわかりやすくして出力する
 * @param {object} msg util.jsのparseDHCPに通して解析
 * @param {boolean} flag 1の場合、オプション等も表示
 */
debug.print=function(msg,flag){
    console.log("------DHCP----------")
    console.log("opcode:")
    console.log("HWaddress:")
    console.log("HopCount:")
    console.log("Transaction ID:")
    console.log("seconds:")
    console.log("Bloodcast Flag:")
    console.log("Client IP:")
    console.log("Your IP:")
    console.log("Server IP:")
    console.log("Next DHCP Server IP:")

    console.log("Server Host Name:")
    console.log("Boot File Path:")

    console.log("----option-----")
    //obj.option
    for(key in msg.option){
        // オプション番号35(DHCPタイプ): 3(DHCP Discover)
        console.log(`${key} (${optionname[]}): ${msg.option[key]}(${optiontypename[key]})`)
    }
}

module.exports=debug