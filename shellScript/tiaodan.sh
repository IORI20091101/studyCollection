#!/bin/sh
. /etc/profile
base_dir=/home/tiaodan/
geddy_exe=/home/nodejs/bin/geddy

check() {
        echo `ps aux | grep $1 | grep -v grep | wc -l`
}
start() {
        key=`check geddy`
        if [ "$key" == "0" ]
        then
                #/usr/bin/nohup ${geddy_exe} -g ${base_dir} -d > /var/log/nohup_node_`date +%Y%m%d%H%M`.log 2>&1 &
                /usr/bin/nohup ${geddy_exe} -g ${base_dir} -d > /dev/null 2>&1 &
                key=`check geddy`
                if [ "$key" == "0" ]
                then
                        echo "Sorry , geddy start error!"
                else
                        echo "OK , geddy start ok!"
                fi
        else
                echo "The geddy is already running!!!"
        fi
}
stop() {
        key=`check geddy`
        if [ "$key" == "0" ]
        then
                echo "The geddy is not running!!!"
        else
                ps aux | grep geddy | grep -v grep | awk '{print $2}' | xargs kill -9 > /dev/null 2>&1
                key=`check geddy`
                if [ "$key" == "0" ]
                then
                        echo "Ok , geddy stop it!"
                else
                        echo "Sorry , geddy stop error!"
                fi
        fi
}
restart() {
        stop
        start
        key=`check geddy`
        if [ "$key" == "0" ]
        then
                echo "Sorry , geddy restart error!"
        else
                echo "Ok , geddy restart ok!"
        fi
}
checkGeddy() {
        #key=`curl -w  -I -m 5 -o /dev/null -s -w %{http_code} -H "Host:www.tiaodan.com" http://192.168.2.83/login`
    key=`curl -w -I -m 5 -o /dev/null -s -w %{http_code} "http://tiaodan.com/login"`
        if [ "$key" == "200" ]
        then
                echo "###`date`,geddy running ok!###"
        else
                start_key=`restart`
                key=`check geddy`
                if [ "$key" == "0" ]
                then
                        echo "###`date`,geddy encounter a problem, and auto start error!###"
                else
                        echo "###`date`,geddy encounter a problem, and auto start ok!###"
                fi
        fi
}

case "$1" in
        start)
                start
                ;;
        stop)
                stop
                ;;
        restart)
                restart
                ;;
        check)
                check geddy
                ;;
        checkGeddy)
                checkGeddy
                ;;
        *)
                echo "Usage : startGeddy (start|stop|restart|checkGeddy)"
esac