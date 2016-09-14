#!/bin/bash
#Program:
# User input dir name, Ifind the premission of files
#Hitory:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input ad directory: " dir
if [ "${dir}" == "" -o ! -d "${dir}"  ];then
	echo "The ${dir} is Not exist in your system"
	exit 1
fi

filelist=$(ls ${dir})
for filename in ${filelist}
do 
	prem=""
	test -r "${dir}/${filename}" && prem="${prem} readable"
	test -w "${dir}/${filename}" && prem="${perm} writable"
	test -x "${dir}/${filename}" && perm="${prem} executable"
	echo "The file ${dir}/${filename}  permission is ${perm}"
done
