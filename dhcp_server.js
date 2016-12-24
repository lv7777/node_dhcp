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
    //console.log(msg.opcode)
    //console.log( msg.mac)

    //DHCP packetかどうか
    util.isDHCP(msgbuffer)
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