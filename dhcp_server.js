const dgram=require("dgram")
//const os=require("os")

const dhcpServer=dgram.createSocket("udp4")

const dhcpPacket=require("./lib/dhcp_adv.js")
const util=require("./lib/util.js")


if(typeof process.argv[2] === "undefined"){
    console.log("undefined.通常モードで開始します。指定モードで開始するには引数にipaddrを指定してください。")
    //dhcp serverは67番で待ち受け、dhcp clientは68番で待ち受け
    dhcpServer.bind(67)
}else{
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;  
    if(process.argv[2].match(ipformat)){
        console.log("真・おｋ")
        dhcpServer.bind(67,process.argv[2])
    }else{
        throw new Error("引数にはipアドレスを指定してください")
    }
}


dhcpServer.on("message",function(msgbuffer,rinfo){
    var msg=util.parseDHCP(msgbuffer)
    console.log(msg.opcode)

    if(msg.isDHCP){
        msg.option.forEach((value,key,map)=>{
            if(key == 53){
                var value2=value[0]//valueはlength分の配列。type 53のlengthは1
                switch(value2){
                    //DHCP discover
                    case 1:
                        console.log("this dhcp is dhcp discover! so, I want to reply you!")
                        var ipaddr=dhcpServer.address().address
                        dhcpPacket.send(2,msg.transactionID,null,null,ipaddr,util.getInterfaces(rinfo))
                        break
                    //DHCP offer
                    case 2:
                        console.log("???")
                        break
                    //DHCP request
                    case 3:
                        console.log("Request!! ok!!")
                        var ipaddr=dhcpServer.address().address
                        if(util.isUsed(msg.nextSettingIP)){
                            //DHCP nak
                            dhcpPacket.send(6,msg.transactionID,null,null,ipaddr,util.getInterfaces(rinfo))
                        }else{
                            //DHCP ack
                            dhcpPacket.send(5,msg.transactionID,null,msg.nextSettingIP,ipaddr,util.getInterfaces(rinfo))
                        }

                        break
                    //DHCP ack
                    case 5:
                        console.log("???")
                        break
                    default:
                        console.log(typeof value)
                        console.log(value)

                }
            }else{
                //console.log("not 53")
                //console.log(key)
            }
        })
    }else{
        new Error("(DHCPじゃ)ないです。")
    }
    dhcpServer.close()
})

dhcpServer.on("error",(err)=>{
    console.warn(`error!!!! ${err}`)
})

dhcpServer.on("listening",(obj)=>{
    const info=dhcpServer.address()
    console.info(`server listening in ${info.address} and Port ${info.address}\n`)
})