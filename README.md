
# 自作DHCPサーバー

https://img.shields.io/badge/License-MPL--2.0-blue.svg

[リンクテキスト](https://www.mozilla.org/en-US/MPL/)

https://camo.githubusercontent.com/bd17368606e29519599d22ad978b772122df74fc/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d504c322e302d626c75652e737667

* exec

`node dhcp_server.js`

this command is setup DHCP server.

or you can only throw dhcp using follow command.

1. `cd ./lib`

2. `node`

3. `const dhcp=require("./dhcp_adv.js")`

4. `dhcp.send(1,0x11451400,null,null,null)`

* ソースの簡単な概要

まずdhcp_server.jsの中でdgramを取り込んでudpのポートをバインドしています。

dhcpが来たら/lib/util.jsのパーサーを使って来たdhcpを仕様に従って解析します。

ここの可変オプション53によりdhcpのタイプ(DHCP discover,DHCP offer,DHCP request,DHCP ack)かどうか判別します。

可変オプションが指定されていない場合、例外を投げます。

その後、検知したdhcpタイプに沿って、仕様に従った動作をします。

e.g. DHCP discoverを受け取ったら、DHCP offerを返す。

実際にDHCPを投げる部分は上記の./libs/dhcp_adv.jsに依存しています。