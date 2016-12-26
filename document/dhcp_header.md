DHCPはほぼ完全に固定ヘッダになっています。可変オプションですら最終的なバイト数は固定になります。

# 固定オプション

[opcode,HWtype,HWlen,xid,TransactionID,time elapsed,flag,client ip,next ip,server ip,GWip,MAC addr,host name,bootfile]

まず、opcodeがあって、これはrequest(1)かresponse(2)のどちらかです。

次にHWtypeがあります。これはdhcpが通るHW(lan等)のタイプです。多くの場合はlan(0x1)になるでしょう。
Wi-Fiの場合でもLanとなります。なぜならWi-Fiは仮想のEthernetとして認識されるからです。

また、このHW typeはARPでも使用されています。

次にHW lengthがあります。HW type 1のLanではlength 06と決まっています。
その後32bitのTransactionIDがあります。TIDやXIDなどと略しているところもあります。

ipヘッダではシーケンスIDという名前になっています。ipヘッダのシーケンス位置のほうではありません。

次にDHCPリレーエージェント機能を使用するかどうかのビットがあります。

その後、time elapsedとflagがあります。16bitで表します。time elapsedはどれだけの時間がかかったかを粟原します。flagはbloodcastかどうかを表します。

どちらも常に0でも問題ないでしょう。

その後、client ip, next ip, server ip, GateWay ipとなります。ここは重要です。全て32bitです。

順にクライアント側のipアドレス、クライアント側にセット予定のipアドレス、サーバー側ipアドレス、ゲートウェイipアドレスになります。

ゲートウェイipアドレスとは、ルーターのipアドレスです。DHCPリレーを使うときに使用されます。

DHCP discoverなどでは全て0になります。

その後、Macアドレスがあり、serverのhostname、bootfile名があります。

ここのMACアドレスは送信する側のMacアドレスになります。

# 可変オプション(DHCP部分)

* dhcp magic cookie

DHCPと認識するための定数です。DHCPにする場合は0x63825262を挿入します。

* Type 53

type53はDHCPタイプを見分けるオプションです。ここが存在する場合ここでDHCPタイプを見分けるのがいいでしょう。

1. DHCP discover

2. DHCP offer

3. DHCP request

5. DHCP ack

他にもDHCP decline、DHCP nakなどにもそれぞれタイプコードが存在します。

* Type 255

type 255は区切り文字（EOLのようなもの）です。

可変オプションも64 byte固定になっているので、type255以降は0によるパディングが必要になります。

# bootpとDHCPの違い

wiresharkではmagic cookie + type 53があった場合にbootpからDHCPと判断されました。