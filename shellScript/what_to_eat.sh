#!/bin/bash
#Program:
#	Try tell you what to eat
#Hitory:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

eat[1]="肯及其"
eat[2]="麦当劳"
eat[3]="大小"
eat[4]="便当"
eat[5]="泡面"
eat[6]="汉堡"

eatnum=6

check=$(( ${RANDOM} * ${EATNUM} / 32767 + 1 ))

echo your many eat ${eat[${check}]}


