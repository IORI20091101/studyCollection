#!/bin/bash
# Program:
# 	This program shows the user's choice
#History:
#2016/09/12 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input (Y/N): " yn

if [ "${yn}" == "Y" ] || [ "${yn}" == "y" ]; then
	echo "Ok, continue"
	exit 0
elif [ "${yn}" == "N" ] || [ "${yn}" == "n" ]; then
	echo "Oh, interrupt!"
	exit 0
else
	echo "I don't know what your choice is " && exit 0
fi
