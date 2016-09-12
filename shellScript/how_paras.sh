#!/bin/bash
# Program:
#	 Program shows the script name, parameters...
# History:
# 2016/09/12 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "The script name is ==> ${0}"
echo "Tocal prammeter number is ==> $#"
[ "$#" -lt 2 ] && echo "The number of parameter is less than 2. Stop here." && exit 0

echo "Your whole parameter is ==> $@"
echo "The lst parameter   ===> ${1}"
echo "The 2st paramrter ===> ${2}"

