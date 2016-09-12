#!/bin/bash
#Program:
#	User input a filename, program will checking the flowing:
#	1) exist? 2) file/directory? 3)file permissions
#History:
#2016/9/12 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo -e "Pelease input a filename, I will check the filename's type and permission. \n\n"
read -p "Input a filename: " filename
test -z ${filename} && echo "You must input a file name." && exit 0

test ! -e ${filename} && echo "The filename '${filename}' DO NOT exist" && exit 0

test -f ${filename} && filetype="regular file"
test -d ${filename} && filetype="directory"
test -r ${filename} && perm="readable"
test -w ${filename} && perm="${perm} writable"
test -x ${filename} && perm="${perm} executable"

echo "Thel filename: ${filename} is a ${filetype}"
echo "And the permissions for you are: ${perm}"
