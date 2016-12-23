const dgram=require("dgram")
const os=require("os")

const dhcpServer=dgram.createSocket("udp4");
const dhcpPacket=dgram.createSocket("udp4")

const util=require("./lib/util.js")

//dhcp serverは67番で待ち受け、dhcp clientは68番で待ち受け
dhcpServer.bind(67)

dhcpServer.on("message",function(msgbuffer,rinfo){
    console.log("get message "+msgbuffer)
    console.log("\n"+typeof msgbuffer)

    var msg=util.parseDHCP(msgbuffer)
    console.log(msg.opcode)

    dhcpServer.close()
})