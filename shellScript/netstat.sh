#!/bin/bash
#Program:
#	Using netstat and grep to detect www, ssh, ftp and mail service
#Hitory:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

echo "Now, I will detect your Linux server's services!"

echo "The www, ftp, ssh and mail(smtp) will be detect! \n"


testfile=/Users/sundongzhi/Documents/git-workspace/github/studyCollection/shellScript/tmp/nestat_checking.txt

netstat -tuln > ${testfile}
testing=$(grep ":80" ${testfile})
if [ "${testing}" != "" ]; then
	echo "www is runing in your system."
fi

testing=$(grep ":22" ${testfile})
if [ "${testing}" != "" ]; then
	echo "SSH is running in your system."
fi

testing=$(grep ":21" ${testfile})
if [ "${testing}" != "" ]; then
	echo "ftp is running in your system."
fi

testing=$(grep ":25" ${testfile})
if [ "${testing}" != "" ]; then
	echo "mail is running in your system."
fi


