/**
 * コマンドラインから任意のdhcpを投げることができるようにする。
 */

const dhcpPacket=require("./dhcp_adv.js")
const util=require("./util.js")
//const dhcpstr=require("./debugDHCP.js")
const udp=require("dgram")

var packet=udp.createSocket("udp4")

//https://github.com/onmodulus/commander.js/blob/master/index.js#L848
function prompt(str,def,fn){
    process.stdout.write(str);
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', function(val=40) {
        fn(val=def);
    })
}

// console.log("create dhcp")
// prompt("input HW type: [1]",1,function(num){
//     console.log("read "+num)

// })
// prompt("input HW len: [6]",6,function(num){
//     console.log("read "+num)
// })

new Promise(function(my_fulfill,my_reject){
    prompt("input HW type: [1]",1,function(num){
        console.log("read "+num)
        my_fulfill()
    })
    
}).then(function(){
    return new Promise(function(my_fulfill,my_reject){

        prompt("input HW len: [6]",6,function(num){
            console.log("read "+num)
            my_fulfill()    
        })
    
    })
}).then(function(){
    return new Promise(function(my_fulfill,my_reject){
    
        prompt("do you want to relay?: [0(no)]",0,function(num){
            console.log("read "+num)
            my_fulfill()
        })
    })
})

// new Promise(function(resolve,reject){
//     prompt("input HW type: [1]",1,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(resolve){
//     prompt("input HW len: [6]",6,function(num){
//         console.log("read "+num)
//         return ;
//     })
// }).then(function(resolve){
//     prompt("do you want to relay?: [0(no)]",0,function(num){
//         console.log("read "+num)
//     })})
// }).then(function(resolve){
//     prompt("do you want to relay?: [0(no)]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(resolve){
//     prompt("input transaction id: [0x18ad1145]",0x18ad1145,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(resolve){
//     prompt("erapse time: [0]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("Bloadcast flags : [0(unicast)]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("client ip address: [0.0.0.0]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("next ip address: [0.0.0.0]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("server ip address: [0.0.0.0]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("relay agent ip address: [0.0.0.0]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("client MAC address: []",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("server host name: [0]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     prompt("boot file name: [0]",0,function(num){
//         console.log("read "+num)
//         resolve();
//     })
// }).then(function(success){
//     console.log("dhcp option.")
//     console.log("If you want to finish, you type 255")
//     console.log("note: if you don't input dhcp option 53, the packet is bootp,not dhcp!!")

// })

// function input_option(num){

// }