const util=require("./util.js")
const udp=require("dgram")
var DHCP={}
/**
 * DHCPを投げる
 * @param {number} dhcptype DHCPのタイプコードです。
 * @param {number} TID トランザクションID
 * @param {String} clientip クライアントのipアドレス。
 * @param {String} nextip クライアントに与えるためのipアドレス
 * @param {String} serverip serveripの文字列。
 */
DHCP.send=(dhcptype,TID,clientip,nextip,serverip)=>{

    const dhcp=udp.createSocket("udp4")


    const arr=new ArrayBuffer(512)
    const av=new DataView(arr)
    const buffer=new Buffer(arr)

    //offset 0はopcodeで、opcodeはdhcp typeによって1(request)か2(reply)になる。
    switch(dhcptype){
        case 1:
            av.setUint8(0,1)
            break
        case 2:
            av.setUint8(0,2)
            break
        case 3:
            av.setUint8(0,1)
            break
        case 4:
            new Error("case 4 is decline, decline is unknown")
            break
        case 5:
        case 6:
            av.setUint8(0,2)
            break
        default:
        new Error("unknown dhcp type")
    }
    av.setUint8(1,0x1)//htype
    av.setUint8(2,0x6)//hlen
    av.setUint8(3,0x0)//bool doyou wanto use relay

    av.setUint32(4,TID)// トランザクションid

    av.setUint16(8,0x0)//second if the packet is dhcp discover then this column is 0;
    av.setUint16(10,0x0)//flag that whenever the packet is bloadcast stream
    
    if(typeof clientip === "string"){
        const clientiparr=clientip.split(".")
        av.setUint8(11,clientiparr[0])
        av.setUint8(12,clientiparr[1])
        av.setUint8(13,clientiparr[2])
        av.setUint8(14,clientiparr[3])
    }else{
        av.setUint32(12,0x0)
    }
    
    switch(dhcptype){
        case 1://dhcp discover時には0にする
            av.setUint32( 16,0x0 )
            break
        case 2:
            //192(C0).168(A8).01.02から254までのランダムな値を返す
            const nextsetip=0xC0A80100+( Math.ceil(Math.random()*253))+1 
            av.setUint32( 16,nextsetip )
            util.iparr.push(nextsetip)
            //util.DB.set(TID,nextsetip)
            break
        case 3://requestの時はリース延長もある//まぁこいつはclient用のコードだから今は考えない。
            av.setUint32( 16,0xC0A80107 )
            break
        case 5://acknak判断は事前にすませてある。
            av.setUint32( 16,0x0 )
        case 6:
            av.setUint32( 16,0x0 )
            break
            
    }


   
    if(typeof serverip === "string"){
        const serveriparr=serverip.split(".")
        av.setUint8(20,serveriparr[0])
        av.setUint8(21,serveriparr[1])
        av.setUint8(22,serveriparr[2])
        av.setUint8(23,serveriparr[3])
    }else{
        av.setUint32(20,0x0)
    }
    



    av.setUint32(24,0x0)//relay server ip ( if not used you should input 0x0

    av.setUint32(28,0x605718f5)//mac address
    av.setUint16(32,0x367e)// also


    av.setUint8(44,0x0)//server host name start

    av.setUint8(108,0x0)//boot file name start
    av.setUint8(235,0x0)//boot file name end

    // constant header end
    // if you want send dhcp, you need dhcp masic cookie ...etc
    //
    // option header start

    const DHCPMAGICCOOKIE=0x63825363
    av.setUint32(236,DHCPMAGICCOOKIE)

    av.setUint8(240,0x35)
    av.setUint8(241,0x01)
    av.setUint8(242,dhcptype)
    

    //type53はlength 3byteなので-1して始める
    av.setUint8(243,0xFF)//終焉の時だ。//option type 255, the end

    av.setUint8(299,0x0)// *あなたは持ち物の空きが少なくなるのを感じた。// 0埋め


    if(av.getUint8(0) == 1){
        //request
        dhcp.send(buffer,0,buffer.length,67,"192.168.0.255",function(err){
        console.log(err)
        dhcp.close()
        })
    }else if(av.getUint8(0) == 2){
        //response
        dhcp.send(buffer,0,buffer.length,67,"192.168.0.255",function(err){
        console.log(err)
        dhcp.close()
        })
    }

    dhcp.on("error",function(err){
        console.log(`an error occurred`)
    })

    dhcp.on("listening",function(err){
        console.log("this socket was binded!!")
    })

    dhcp.on("close",function(err){
        console.log("the store has been closed!")
    })


}
// DHCP.send(1,0x11451400,"192.168.1.1")
// DHCP.send(2,0x11451401,"192.168.1.1")
// DHCP.send(3,0x11451402,"192.168.1.1")
// DHCP.send(5,0x11451405,"192.168.1.1")
module.exports=DHCP