#/bin/bash
#Program:
#	User inputs his first name and last name. Program shows his full name
#History:
#2016/09/11 sundongzhi release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p "Please input your first name: " firstname
read -p "Pleast input you last name: " lastname
echo -e "\n Your full name is: ${firstname} ${lastname}"
