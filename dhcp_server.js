const dgram=require("dgram")
//const os=require("os")

const dhcpServer=dgram.createSocket("udp4")

const dhcpPacket=require("./lib/dhcp_adv.js")
const util=require("./lib/util.js")

//dhcp serverは67番で待ち受け、dhcp clientは68番で待ち受け
dhcpServer.bind(67)

dhcpServer.on("message",function(msgbuffer,rinfo){
    //console.log(util.getInterfaces(rinfo))
    //console.log("get message "+msgbuffer)
    //console.log("\n"+typeof msgbuffer)

    var msg=util.parseDHCP(msgbuffer)
    console.log(msg.opcode)
    //console.log( msg.mac)

    //DHCP packetかどうか
    if(msg.isDHCP){
        msg.option.forEach((value,key,map)=>{
            if(key == 53){
                console.log("53!!53!!  "+msg.nextSettingIP)
                var value2=value[0];//valueはlength分の配列。type 53のlengthは1
                switch(value2){
                    //DHCP discover
                    case 1:
                        console.log("this dhcp is dhcp discover! so, I want to reply you!")
                        dhcpPacket.send(2,msg.transactionID,null,null,null);
                        break
                    //DHCP offer
                    case 2:
                         console.log("???")
                        break
                    //DHCP request
                    case 3:
                        console.log("Request!! ok!!")

                        //dhcpリースの可能性も十分ありえるため、nakは出さない
                        // if( util.validTransaction(msg.transactionID,msg.nextSettingIP) ){
                        //     //DHCP ack
                        // }else{
                        //     //DHCP nak
                        // }

                        if(util.isUsed(msg.nextSettingIP)){
                            //DHCP nak
                            dhcpPacket.send(6,msg.transactionID,null,null,null)
                        }else{
                            //DHCP ack
                            dhcpPacket.send(5,msg.transactionID,null,msg.nextSettingIP,null)
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
    //DHCP discoverかどうか
    

    dhcpServer.close()
})

dhcpServer.on("error",(err)=>{
    console.warn("error!!!!"+ err)
})

dhcpServer.on("listening",(obj)=>{
    const info=dhcpServer.address()
    console.info("server listening in "+info.address + " and "+info.port+" port\n")
})