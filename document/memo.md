0
	Pad 	
0
	パッド。オプション・データを一定サイズ（314オクテット）まで埋めるのに使用する
1
	Subnet Mask 	
4
	サブネット・マスク・アドレス
2
	Time Offset 	
4
	タイム・オフセット（UTCからの差分秒数）
3
	Router 	
可変
	デフォルト・ゲートウェイ・アドレス
4
	Time Server 	
可変
	タイム・サーバ・アドレス
5
	Name Server 	
可変
	ネーム・サーバ（IEN116）・アドレス
6
	Domain Server 	
可変
	DNSサーバ・アドレス
7
	Log Server 	
可変
	ロギング・サーバ・アドレス
8
	Quotes Server 	
可変
	Quotesサーバ・アドレス
9
	LPR Server 	
可変
	LPR（UNIXのlprd）サーバ・アドレス
10
	Impress Server 	
可変
	Impressサーバー・アドレス
11
	RLP Server 	
可変
	RLP（RFC887）サーバ・アドレス
12
	Hostname 	
可変
	クライアントのホスト名
13
	Boot File Size 	
2
	ブート・ファイル・サイズ
14
	Merit Dump File 	
可変
	ダンプ・ファイル名
15
	Domain Name 	
可変
	DNSドメイン名
16
	Swap Server 	
可変
	スワップ・サーバ・アドレス
17
	Root Path 	
可変
	スワップ・サーバ・ルート・ディスクのパス名
18
	Extension File 	
可変
	拡張パス名
19
	Forward On/Off 	
1
	IP Forwardingの有効／無効
20
	SrcRte On/Off 	
1
	ローカル以外のサブネットへのソース・ルーティングの有効／無効
21
	Policy Filter 	
可変
	ソース・ルーティング・ポリシー・フィルタ
22
	Max DG Assembly 	
2
	最大データグラム再構築サイズ
23
	Default IP TTL 	
1
	IPのTTL（Time To Live）値のデフォルト
24
	MTU Timeout 	
4
	Path MTU 有効時間（秒）
25
	MTU Plateau 	
可変
	Path MTU Plateauテーブル
26
	MTU Interface 	
2
	MTUサイズ
27
	MTU Subnet 	
1
	すべてのサブネットをローカルと見なすかどうか
28
	Broadcast Address 	
4
	ブロードキャスト・アドレス
29
	Mask Discovery 	
1
	ICMPサブネット・マスクDiscoveryへの応答可否
30
	Mask Supplier 	
1
	ICMPサプネット・マスク要求への応答可否
31
	Router Discovery 	
1
	ICMP Router Discoveryへの応答可否
32
	Router Request 	
4
	Router Solicitationアドレス
33
	Static Route 	
可変
	スタティック・ルーティング
34
	Trailers 	
1
	トレーラー・カプセル化（RFC 983）
35
	ARP Timeout 	
4
	ARPキャッシュ・タイムアウト（秒）
36
	Ethernet 	
1
	イーサネット・カプセル化
37
	Default TCP TTL 	
1
	TCPのTTL（Time To Live）値のデフォルト
38
	Keepalive Time 	
4
	TCP Keepaliveインターバル（秒）
39
	Keepalive Data 	
1
	TCP Keepaliveカベージ・データ送信の有効／無効
40
	NIS Domain 	
可変
	NISドメイン名
41
	NIS Servers 	
可変
	NISサーバ・アドレス
42
	NTP Servers 	
可変
	NTPサーバ・アドレス
43
	Vendor Specific 	
可変
	ベンダ固有オプション
44
	NETBIOS Name Srv 	
可変
	NETBIOSネーム・サーバ（WINS）・アドレス
45
	NETBIOS Dist Srv 	
可変
	NETBIOS Datagram Distributionサーバ（NBDD）・アドレス
46
	NETBIOS Node Type 	
1
	NETBIOSノード・タイプ
47
	NETBIOS Scope 	
可変
	NETBIOSスコープ
48
	X Window Font 	
可変
	X Windowフォント・サーバ・アドレス
49
	X Window Manager 	
可変
	X Windowマネージャ・アドレス
50
	Address Request 	
4
	クライアントがリクエストするIPアドレス
51
	Address Time 	
4
	IPアドレス・リース期間
52
	Overload 	
1
	サーバ名／ブートファイル名を上書き利用するかどうか
53
	DHCP Msg Type 	
1
	DHCPメッセージ・タイプ
54
	DHCP Server Id 	
4
	DHCPサーバ・アドレス
55
	Parameter List 	
可変
	クライアントからのパラメータ要求リスト
56
	DHCP Message 	
可変
	DHCPエラーメッセージ
57
	DHCP Max Msg Size 	
2
	DHCP最大メッセージ・サイズ
58
	Renewal Time 	
4
	クライアントがアドレスを取得してからRenewal（リースの再延長要求）するまでの期間（秒）
59
	Rebinding Time 	
4
	クライアントがアドレスを取得してからRebindingするまでの期間（秒）
60
	Class Id 	
可変
	使用するクラス名
61
	Client Id 	
可変
	クライアントIdentifier
62
	Netware/IP Domain 	
可変
	Netware/IP Domain Name
63
	Netware/IP Option 	
可変
	Netware/IP sub Options
64
	NIS-Domain-Name 	
可変
	NIS+ v3 Client Domain Name
65
	NIS-Server-Addr 	
可変
	NIS+ v3 Server Addresses
66
	Server-Name 	
可変
	TFTPサーバ名
67
	Bootfile-Name 	
可変
	ブート・ファイル名
68
	Home-Agent-Addrs 	
可変
	モバイルIPホーム・エージェント・アドレス
69
	SMTP-Server 	
可変
	SMTPサーバ・アドレス
70
	POP3-Server 	
可変
	POP3サーバ・アドレス
71
	NNTP-Server 	
可変
	NNTPサーバ・アドレス
72
	WWW-Server 	
可変
	Webサーバ・アドレス
73
	Finger-Server 	
可変
	Fingerサーバ・アドレス
74
	IRC-Server 	
可変
	IRC（チャット）サーバ・アドレス
75
	StreetTalk-Server 	
可変
	StreetTalkサーバ・アドレス
76
	STDA-Server 	
可変
	ST Directory Assistance Addresses
77
	User-Class 	
可変
	User Class Information
78
	Directory Agent 	
可変
	directory agent information
79
	Service Scope 	
可変
	service location agent scope
80
	Naming Authority 	
可変
	naming authority
81
	Client FQDN 	
可変
	クライアントのFQDN名。ダイナミックDNSへの登録などに使用される
82
	Agent Circuit ID 	
可変
	Agent Circuit ID
83
	Agent Remote ID 	
可変
	Agent Remote ID
84
	Agent Subnet Mask 	
可変
	Agent Subnet Mask
85
	NDS Servers 	
可変
	Novell Directory Services
86
	NDS Tree Name 	
可変
	Novell Directory Services
87
	NDS Context 	
可変
	Novell Directory Services
88
	IEEE 1003.1 POSIX 	
可変
	IEEE 1003.1 POSIX Timezone
89
	FQDN 	
可変
	Fully Qualified Domain Name
90
	Authentication 	
可変
	Authentication（RFC3118）
91
	Vines TCP/IP 	
可変
	Vines TCP/IP Server Option
92
	Server Selection 	
可変
	Server Selection Option
93
	Client System 	
可変
	Client System Architecture
94
	Client NDI 	
可変
	Client Network Device Interface
95
	LDAP 	
可変
	Lightweight Directory Access Protocol
96
	IPv6 Transitions 	
可変
	IPv6 Transitions
97
	UUID/GUID 	
可変
	UUID／GUID-based Client Identifier
98
	User-Auth 	
可変
	Open Group's User Authentication
99
	
未定義
100
	Printer Name 	
可変
	Printer Name
101
	MDHCP 	
可変
	DHCP multicast address
102～
107
	
削除／未定義
108
	Swap Path 	
可変
	Swap Path Option
109
	
未定義
110
	IPX Compatability 	
可変
	IPX Compatability
111
	
未定義
112
	Netinfo Address 	
可変
	NetInfo Parent Server Address
113
	Netinfo Tag 	
可変
	NetInfo Parent Server Tag
114
	URL 	
可変
	URL
115
	Failover 	
可変
	DHCP Failover Protocol
116
	Auto-Config 	
可変
	DHCP Auto-Configuration
117
	Name Service Search 	
2
	Name Service Search
118
	Subnet Selection Option 	
4
	Subnet Selection Option(RFC3011)
119～
125
	
未定義
126
	Extension 	
N
	Extension
127
	Extension 	
N
	Extension
128～
254
	
拡張用
255
	End 	
0
	オプションの終了位置を示す