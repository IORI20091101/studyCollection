#!/bin/bash
#Program:
#	User input a scale number to claculate pi number.
# History:
# 2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "This Program wil calculate pi value. \n"
echo -e "You should input a float number to calculate pi value. \n"
read -p "The scale numebr (10~10000)?" checking

num=${checking:-"10"}
echo "Starting calcuate pi value. Be patient."
time echo "scale=${num}; $*a(1)" | bc -lq
