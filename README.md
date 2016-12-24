
# 自作DHCPサーバー

* exec

`node dhcp_server.js`

* ソースの簡単な概要

まずdhcp_server.jsの中でdgramを取り込んでudpのポートをバインドしています。

dhcpが来たら/lib/util.jsのパーサーを使って来たdhcpを仕様に従って解析します。

ここの可変オプション53によりdhcpのタイプ(DHCP discover,DHCP offer,DHCP request,DHCP ack)かどうか判別します。

可変オプションが指定されていない場合、例外を投げます。

その後、検知したdhcpタイプに沿って、仕様に従った動作をします。