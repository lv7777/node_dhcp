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
        prompt("input transaction id: [0x18ad1145]",0x18ad1145,function(num){
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
            dv.setUint32(16,num-0)
            resolve();
        })
    })

}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("next ip address: [0.0.0.0]",0,function(num){
            console.log("read "+num)
            dv.setUint32(20,num-0)
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("server ip address: [0.0.0.0]",0,function(num){
            console.log("read "+num)
            dv.setUint32(24,num-0)
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("relay agent ip address: [0.0.0.0]",0,function(num){
            console.log("read "+num)
            dv.setUint32(28,num-0)
            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("client MAC address: [33:33:33:33:33:33:33]",0,function(num){
            console.log("read "+num)

            resolve();
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("server host name: [0]",0,function(num){
            console.log("read "+num)
            resolve()
        })
    })
}).then(function(success){
    return new Promise(function(resolve,my_reject){
        prompt("boot file name: [0]",0,function(num){
            console.log("read "+num)
            resolve()
        })
    })
}).then(function(success){
    console.log("dhcp option.")
    console.log("If you want to finish, you type 255")
    console.log("note: if you don't input dhcp option 53, the packet is bootp,not dhcp!!")
    return new Promise(function(resolve,reject){
        resolve(0)
    }).then(function loop(i){
        return new Promise(function(resolve,reject){
            prompt("choose option number: [0]",0,function(num){
                if(num=="255"){
                    console.log("finish!!")
                    reject()
                }else{
                    prompt("choose option "+num+" value: [55]",55,function(value){
                        console.log("read "+value)
                        resolve(3)
                    })  
                }
            })
        }).then(loop).catch(function(){
            console.log("sending follow dhcp!")
            //TODO:

            //send dhcp
        })
    })
})
