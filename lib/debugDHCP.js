var debug={}

const opcode=["DHCP Request","DHCP Reply"]

const hwtype={

}

const flagState=["OFF","ON"]


//option 120 is undefined but I defined easter egg!
const option={
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
    
}

module.exports=debug