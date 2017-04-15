var debug={}

const opcode=["DHCP Request","DHCP Reply"]

//last is 37//38-255 is unasigned, 65535 is reserved
//chaosの定義は２つある。一つはイーサネットの種類、もう一つはプロトコルのタイプ
const hwtype=["Reserved " , "Ethernet (10Mb)  " , "Experimental Ethernet (3Mb) " , "Amateur Radio AX.25 " , "Proteon ProNET Token Ring " , "Chaos " , "IEEE 802 Networks " , "ARCNET " , "Hyperchannel " , "Lanstar " , "Autonet Short Address " , "LocalTalk " , "LocalNet (IBM PCNet or SYTEK LocalNET) " , "Ultra link " , "SMDS " , "Frame Relay " , "Asynchronous Transmission Mode (ATM) " , "HDLC " , "Fibre Channel " , "Asynchronous Transmission Mode (ATM) " , "Serial Line " , "Asynchronous Transmission Mode (ATM) " , "MIL-STD-188-220 " , "Metricom " , "IEEE 1394.1995 " , "MAPOS " , "Twinaxial " , "EUI-64 " , "HIPARP " , "IP and ARP over ISO 7816-3 " , "ARPSec " , "IPsec tunnel " , "InfiniBand (TM) " , "TIA-102 Project 25 Common Air Interface (CAI) " , "Wiegand Interface " , "Pure IP " , "HW_EXP1 " , "HFI "]

const flagState=["OFF","ON"]

const optionarr=["pad", "Subnet mask", "Time offset", "Routers", "Time server", "Name server", "DNS server", "Log server", "Cookie server", "LPR server", "Impress server", "Resource location server", "Host name", "Boot file size", "Merit dump file", "Domainname", "Swap server", "Root path", "Extensions path", "IP forwarding", "Non-local source routing", "Policy filter", "Maximum datagram reassembly size", "Default IP TTL", "Path MTU aging timeout", "Path MTU plateau table", "Interface MTU", "All subnets local", "Broadcast address", "Perform mask discovery", "Mask supplier", "Perform router discovery", "Router solicitation", "Static route", "Trailer encapsulation", "ARP cache timeout", "Ethernet encapsulation", "TCP default TTL", "TCP keepalive interval", "TCP keepalive garbage", "NIS domain", "NIS servers", "NTP servers", "Vendor specific info", "NetBIOS name server", "NetBIOS datagram distribution server", "NetBIOS node type", "NetBIOS scope", "X Window System font server", "X Window System display server", "Request IP address", "IP address leasetime", "Option overload", "DHCP message type", "Server identifier", "Parameter Request List", "Message", "Maximum DHCP message size", "T1", "T2", "Vendor class identifier", "Client-identifier", "Netware/IP domain name", "Netware/IP domain information", "NIS+ domain", "NIS+ servers", "TFTP server name", "Bootfile name", "Mobile IP home agent", "SMTP server", "POP3 server", "NNTP server", "WWW server", "Finger server", "IRC server", "StreetTalk server", "StreetTalk directory assistance server", "User-class Identification", "SLP-directory-agent", "SLP-service-scope", "Naming Authority", "Client FQDN", "Relay Agent Information", "Agent Remote ID", "Agent Subnet Mask", "NDS server", "NDS tree name", "NDS context", "IEEE 1003.1 POSIX", "FQDN", "Authentication", "Vines TCP/IP", "Server Selection", "Client System", "Client NDI", "LDAP", "IPv6 Transitions", "UUID/GUID", "UPA servers", "???", "Printer Name", "MDHCP", "???", "???", "???", "???", "???", "???", "Swap Path", "???", "IPX Compatability", "???", "Netinfo Address", "Netinfo Tag", "URL", "DHCP Failover", "DHCP Autoconfiguration", "Name Service Search", "Subnet selection", "Domain Search", "SIP Servers DHCP Option", "Classless Static Route", "???", "Easter Egg!!", "???", "???", "Extension", "Extension", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "HP - TFTP file", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "Authenticate", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "MSFT - Classless route", "???", "???", "MSFT - WinSock Proxy Auto Detect", "???", "???", "End"];

//option 120 is undefined but I defined easter egg!
const optiontypename={
    53:{
        1:"DHCP DISCOVER",
        2:"DHCP OFFER",
        3:"DHCP REQUEST",
        4:"DHCP DECLINE",
        5:"DHCP ACK",
        6:"DHCP NAK",
        7:"DHCP RELEASE",
        8:"DHCP INFORM",
        9:"DHCP FORCERENEW"
    },
    123:{
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
    for(key in msg.option){
        // オプション番号35(DHCPタイプ): 3(DHCP Discover)
        console.log(`${key} (${optionarr[key]}): ${msg.option[key]}(${optiontypename[key]})`)
    }
}

module.exports=debug