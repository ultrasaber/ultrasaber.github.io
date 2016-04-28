---
layout: post
title: "Network Computing Final Notes"
date: 2016-04-27
categories: networking
---
I hope this saves you from digging around the modules. Be sure to do those Skills Integration Challenges as well.

Subnetting, Classful & VLSM
---------------------------

* Honestly, the best way for you to learn this is to practice yourself. Look up questions online.

Classful IPv4 Addressing
------------------------

Class A
=======

* Legacy classful address range: 0.0.0.0/8 - 127.0.0.0/8
* Private address range: 10.0.0.0/8
* For `HUEG` networks.

Class B
=======

* Legacy classful address range: 128.0.0.0/16 - 191.255.0.0/16
* Private address range: 172.16.0.0/12
* For not-so `HUEG` networks.

Class C
=======

* Legacy classful address range: 192.0.0.0/24 - 223.255.255.0/24
* Private address range: 192.168.0.0/16
* For puny networks.

Multicast
=========

* Multicast range: 224.0.0.0 - 239.255.255.255
* Range on local network: 224.0.0.0/24
* Multicasts are typically used to exchange routing information.
* Client subscribe to a multicast group under one multicast address.

Experimental
============

* Range: 240.0.0.0/4
* Class D: 224.0.0.0 - 239.0.0.0
* Class E: 240.0.0.0 - 255.0.0.0
* For `SCIENCE`.

Link-local
==========

* Range: 169.254.0.0/16
* Automatically configured if there is no IP address dynamically assigned.

Loopback
========

* Range: 127.0.0.0/8
* Used to test your network stack (i.e. 127.0.0.1)

Classless IPv4 Addressing
-------------------------

* Note the private networks above.
* Public addresses are literally anything other than addresses in the private networks.
* Public addresses are routable over the Internet; private addresses are not.
* NAT: Network Address Translation. Translates between public and private addresses, so that hosts on a private network can communicate over the internet.
* VLSM: Variable Length Subnet Masking. Practice this.

Subnet Info
-----------

* Network Address: The first address in the subnet (host portion is all zeroes)
* Broadcast Address: The last address in the subnet (host portion is all ones)
* Host Address: Anything else within that subnet.

Services
--------

Well-known services and ports
=============================

{% highlight none %}
Port #  Acronym        Term                                 Function
======  ============== ==================================== ===================================================
20      FTP(data)      File Transfer Protocol               File transfer via TCP
21      FTP(control)   File Transfer Protocol               "
22      SSH            Secure Shell                         Secure remote CLI access
23      Telnet         Telnet                               Insecure remote CLI access
25      SMTP           Simple Mail Transfer Protocol        Transfers email between servers
53      DNS            Domain Name Service                  Resolves names to addresses
67      DHCP(server)   Dynamic Host Configuration Protocol  Dynamic addressing
68      DHCP(client)   Dynamic Host Configuration Protocol  "
69      TFTP           Trivial File Transfer Protocol       File transfer via UDP
80      HTTP           Hypertext Transfer Protocol          Web requests
110     POP3           Post Office Protocol                 Transfers mail from server to client. 
                                                            Mail from the POP server is deleted after retrieval.
143     IMAP           Internet Mail Access Protocol        Transfers mail from server to client.
                                                            Mail is mirrored on the server and client.
161     SNMP           Simple Network Management Protocol   Collects and organizes info on network devices.
443     HTTPS          Hypertext Transfer Protocol Secure   Secure version of HTTP, using SSL encryption.
{% endhighlight %}

Common protocol suites
======================

* Um... the TCP/IP protocol suite?
* I'd imagine that if you know how protocols interact with each other within the OSI or TCP/IP models, you should be fine.
* With that being said...

OSI Model & Troubleshooting
---------------------------

OSI and TCP/IP models
=====================

{% highlight none %}
OSI Layer #  OSI Layer Name  TCP/IP Layer #  TCP/IP Layer Name
===========  ==============  ==============  =================
1            Physical        1               Network Access
2            Data Link       "               "
3            Network         2               Internet
4            Transport       3               Transport
5            Session         4               Application
6            Presentation    "               "
7            Application     "               "
{% endhighlight %}

* To troubleshoot a network, start at one end of the model and work your way to the other end.
* You can also start somewhere in the middle of the model. It's all about preference.

Building a secure network
-------------------------

* `enable password *`
* `enable secret *`
* `login block-for * attempts * within *`
* `banner motd *`
* `service password-encryption`
* Configure console and vty lines. (`line console 0` & `line vty 0 15`)
  * `password *`
  * `login`
  * `exec-timeout`
* Configure interfaces.
  * `ip address * *`
	* `no shutdown`

Configuring SSH
===============

* `ip domain-name *`
* `hostname *`
* `crypto key gen rsa ...`
* `username * priv * secret *`
* In line configuration, enter `transport input ssh` and `login local`

* There's a hell of a lot more than this. Practice hard.

Backing up
==========

* Either copy the output of `show run` or use `copy running-config tftp`
