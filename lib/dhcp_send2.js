/**
 * コマンドラインから任意のdhcpを投げることができるようにする。
 */

const dhcpPacket=require("./dhcp_adv.js")
const util=require("./util.js")
//const dhcpstr=require("./debugDHCP.js")
const udp=require("dgram")

var packet=udp.createSocket("udp4")

var av=new ArrayBuffer(512)
var dv=new DataView(av)
var buffer=new Buffer(av)

//https://github.com/onmodulus/commander.js/blob/master/index.js#L848
function prompt(str,def,fn){
    process.stdout.write(str);
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', function(val) {
        //console.log(val.charCodeAt())
        //when input none to stdin,nodejs is returned charcode 10 
        if(val.charCodeAt()==10){
            //no input
            val=def
            //console.log(val)
        }else{
            //trim new line
            //console.log is aleady have new line
            val=val.trim()
        }
        fn(val);
    }).resume()
}

new Promise(function(my_fulfill,my_reject){
    prompt("input opcode: [1]",1,function(num){
        console.log("read "+num)
        dv.setUint8(0,num-0)
        my_fulfill()
    })
}).then(function(){
    return new Promise(function(my_fulfill,my_reject){
        prompt("input HW type: [1]",1,function(num){
            console.log("read "+num)
            dv.setUint8(1,num-0)
            my_fulfill()
        })
    })
}).then(function(){
    return new Promise(function(my_fulfill,my_reject){
        prompt("input HW len: [6]",6,function(num){
            console.log("read "+num)
            dv.setUint8(2,num-0)
            my_fulfill()    
        })
    })
}).then(function(){
    return new Promise(function(my_fulfill,my_reject){
        prompt("do you want to relay?: [0(no)]",0,function(num){
            console.log("read "+num)
            dv.setUint8(3,num-0)
            my_fulfill()
        })
    })
}).then(function(){
    return new Promise(function(my_fulfill,my_reject){
        prompt("input transaction id: [0x18ad1145]",0x37777774,function(num){
            console.log("read "+num)
            dv.setUint32(4,num-0)
            my_fulfill()
        })
    })
}).then(function(resolve){
    return new Promise(function(resolve,my_reject){
        prompt("erapse time: [0]",0,function(num){
            console.log("read "+num)
            dv.setUint16(8,num-0)
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("Bloadcast flags : [0(unicast)]",0,function(num){
            console.log("read "+num)
            dv.setUint16(10,num-0)
            resolve();
        })
    })

}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("client ip address: [0.0.0.0]",0,function(num){
            console.log("read "+num)
            dv.setUint32(12,num-0)
            resolve();
        })
    })

}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("next ip address: [0.0.0.0]",0,function(num){
            console.log("read "+num)
            dv.setUint32(16,num-0)
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("server ip address: [192.168.114.19]","192.168.114.19",function(serverip){
            //TODO: migrate util
            if(typeof serverip === "string"){
                const serveriparr=serverip.split(".")
                dv.setUint8(20,serveriparr[0])
                dv.setUint8(21,serveriparr[1])
                dv.setUint8(22,serveriparr[2])
                dv.setUint8(23,serveriparr[3])
            }else{
                dv.setUint32(20,serverip-0)
            }
            console.log("read "+serverip)
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("relay agent ip address: [0.0.0.0]",0,function(num){
            console.log("read "+num)
            dv.setUint32(24,num-0)
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("client MAC address: [33:33:33:33:33:33:33]","33:33:33:33:33:33",function(num){
            console.log("read "+num)
            macstr_write(num,28,dv)
            console.log("mac first is"+dv.getUint8(32))
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("server host name: [0]",0,function(num){
            console.log("read "+num)
            dv.setUint8(44,0)
            resolve()
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("boot file name: [0]",0,function(num){
            console.log("read "+num)
            dv.setUint8(108,0)
            dv.setUint8(235,0)
            resolve()
        })
    })
}).then(function(success){
    console.log("--------------dhcp option-----------")
    console.log("If you want to finish, you type 255")
    console.log("note: if you don't input dhcp option 53, the packet is bootp,not dhcp!!")
    return new Promise(function(resolve,reject){
        resolve(0)
    }).then(function loop(i){
        return new Promise(function(resolve,reject){
            prompt("choose option number: [0]",0,function(num){
                if(num=="255"){
                    dv.setUint32(236,0x63825363)

                    dv.setUint32(240,0x35010100)//option type 53,真の力、千里眼の壱、dhcp discover// 0x35 == 0d53,length 1,type 1(discover)

                    //type53はlength 3byteなので-1して始める
                    dv.setUint8(243,0xFF)//終焉の時だ。//option type 255, the end

                    dv.setUint8(299,0x0)// *あなたは持ち物の空きが少なくなるのを感じた。// 0埋め

                    console.log("finish!!")
                    packet.send(buffer,0,buffer.length,67,"localhost",function(err){
                        console.log(err)
                        packet.close()
                    })
                    
                    //reject()
                }else{
                    prompt("choose option "+num+" value: [55]",55,function(value){
                        console.log("read option number is"+num+" value is"+value)
                        resolve(3)
                    })  
                }
            })
        }).then(loop).catch(function(){
            console.log("sending follow dhcp!")
            //TODO:
            //util.parse
            //debug.print

            //send dhcp
            packet.send(buffer,0,buffer.length,67,"192.168.0.255")
            packet.close()
        })
    })
})

//we will migrate 2 util
function macstr_write(str,offset,dv){
    if(/.*:.*/.test(str)){
        console.log("the str is sepalated : str")
        var arr= str.split(":")
        //console.log(arr)
        for(var i in arr){
            var inta=parseInt(arr[i],16)
            console.log((offset-0)+(i-0)+" is "+arr[i])
            dv.setUint8((offset-0)+(i-0),inta)
        }
    }else if(/.*-.*/.test(str)){
        console.log("the str is sepalated - str")
        var arr=str.split("-")
        console.log(arr)
        for(var i in arr){
            var inta=parseInt(arr[i],16)
            console.log(inta)
            dv.setUint8(offset+i,arr[i])
        }
    }
}

packet.on("error",function(err){
console.log(`an error occurred ${err}`)
})