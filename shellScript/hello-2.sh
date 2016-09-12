#!/bin/bash
#Program:
#	This Program shows "Hello World!" in your screen
#Hitory:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH


if [ "${1}" == "hello" ]; then
	echo "Hllo, how are you ?"
elif [ "${1}" == ""  ]; then
	echo "You MUST input parameters ex > { ${0} someword  }"
else 
	echo "The only parameter is 'hello' > {${0} hello}"
fi
