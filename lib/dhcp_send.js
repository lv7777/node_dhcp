const udp=require("dgram")
var DHCP={}
/**
 * DHCPofferを投げる
 * @param {number} TID トランザクションID
 * @param {String} serverip serveripの文字列。
 */
DHCP.offer=(TID,serverip)=>{

    const dhcp=udp.createSocket("udp4")


    const arr=new ArrayBuffer(512);
    const av=new DataView(arr)
    const buffer=new Buffer(arr)

    av.setUint8(0,2);//opcode
    av.setUint8(1,0x1);//htype
    av.setUint8(2,0x6);//hlen
    av.setUint8(3,0x0);//bool doyou wanto use relay

    av.setUint32(4,TID)// トランザクションid

    av.setUint16(8,0x0)//second if the packet is dhcp discover then this column is 0;
    av.setUint16(10,0x0)//flag that whenever the packet is bloadcast stream


    av.setUint32(12,0x0)//client id
    av.setUint32(16,0xC0A80100+( Math.ceil(Math.random()*253))+1 )//192(C0).168(A8).01.02から254までのランダムな値を返す

    const serveriparr=serverip.split(".")
    av.setUint8(20,serveriparr[0])
    av.setUint8(21,serveriparr[1])
    av.setUint8(22,serveriparr[2])
    av.setUint8(23,serveriparr[3])

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

    // DHCP Masic cookie
    // この呪文を詠唱することでbootpはdhcpへと昇華できるのだ・・・
    av.setUint32(236,0x63825363)

    av.setUint32(240,0x35010200)//option type 53,真の力、千里眼の壱、dhcp discover// 0x35 == 0d53,length 1,type 1(discover)

    //type53はlength 3byteなので-1して始める
    av.setUint8(243,0xFF)//終焉の時だ。//option type 255, the end

    av.setUint8(299,0x0)// 0埋め

    // 最低限DHCPに必要な可変ヘッダ入れ完了
    //windows7の場合、255.255.255.255は使えない。自分で所属しているネットワークとサブネット計算する必要がある。
    dhcp.send(buffer,0,buffer.length,68,"192.168.1.255",function(err){
    console.log(err)
    dhcp.close();
    })

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
//offer(0x11451400)
module.exports=DHCP