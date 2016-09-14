#!/bin/bash
#Program:
#	This script only accepts the folwing parameter: one two three.
#Hitory:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "This program will print your selection !"

# read -p "input your choice:" choice
# case ${choice} in

case ${1} in
	"one")
		echo "Your choice is ONE"
		;;
	"two")
		echo "Your choice is Two"
		;;
	"three")
		echo "Your choice is Three"
		;;
esac


