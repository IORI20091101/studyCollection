#!/bin/bash
#Propgram
#	Program creates three files, which named by user's input and date command.
#History:
# 2016/09/11 sundongzhi release
PATH=/bin:sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
echo  "Your should input 2 numbers, Iwill multiplying them \n"
read -p "first number: " firstnu
read -p "second number: " secnu
total=$((${firstnu}*${secnu}))
echo  "\n The result of ${firstnu} x ${secnu} is ==> ${total}"
