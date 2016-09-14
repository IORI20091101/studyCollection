#!/bin/bash
#Program:
#	Show "Hello " from $1.. by using case esac
#Hitory:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

case ${1} in 
	"hello")
		echo "Hllo, how are you?"
		;;
	"")
		echo "You Must input parameters ex > {${0} someword}"
		;;
	*)
		echo "Usage ${0} {hello}"
		;;
esac
