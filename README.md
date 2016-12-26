
# 自作DHCPサーバー

[![MPL 2.0 License](https://img.shields.io/badge/License-MPL--2.0-blue.svg)](https://www.mozilla.org/en-US/MPL/)

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

# about DHCP

you can read follow reference!

DHCPはネットワーク下のIPアドレスを自動的に割り当てることのできるサーバーです。

DHCP discover -> DHCP offer -> DHCP request -> DHCP ack,nak

というのがDHCPの基本的な流れになります。

以下に詳しい説明を書きました。

[DHCPヘッダについて](./document/dhcp_header.md)

# jsdoc

if you want to read jsdoc, you can use follow links!

[JSdoc - dhcp_server.js(index)](https://lv7777.github.io/node_dhcp/out/global.html)

[JSdoc - lib/util.js(util)](https://lv7777.github.io/node_dhcp/out/util.js.html)

[JSdoc - lib/dhcp_adv.js](https://lv7777.github.io/node_dhcp/out/dhcp_adv.js.html)