#!/bin/bash
# Program:
#	 Program shows the effect of script shift function...
# History:
# 2016/09/12 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "Tocal prammeter number is ==> $#"
echo "Your whole parameter is ==> $@"
shift
echo "Tocal prammeter number is ==> $#"
echo "Your whole parameter is ==> $@"
shift 3
echo "Tocal prammeter number is ==> $#"
echo "Your whole parameter is ==> $@"
