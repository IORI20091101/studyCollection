#!/bin/bash
#Program:
#	This Program will calculate 1+2+3+...+- 100  result 
#Hitory:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

s=0
i=0
while [ "${i}" != "100"  ]
do 
	i=$(($i+1))
	s=$(($s+$i))
done

echo "The result of 1+2+3+..+100 result: is ===> ${s} "


