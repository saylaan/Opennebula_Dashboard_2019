#!/bin/bash

function log()
{
	echo `date "+%Y.%m.%d %H:%M:%S"` "- $1" >> /root/SandboxALE-AAPP_2019/server/src/rainbow/rainbow.log
}




function email()
{
if [ -z "$1" ]; then 
    cat<<EOF >/root/SandboxALE-AAPP_2019/server/src/rainbow/message.$$
Greetings, 

Please find below the credential for each of your Rainbow users

EOF
else
    cat<<EOF >>/root/SandboxALE-AAPP_2019/server/src/rainbow/message.$$
${1}
EOF
fi
}




function sendEmail()
{
    cat /root/SandboxALE-AAPP_2019/server/src/rainbow/message.$$ | /usr/local/bin/mutt -s "Rainbow credentials" ${EMAIL}
    
    if [ -f "/root/SandboxALE-AAPP_2019/server/src/rainbow/message.$$" ]; then
        rm /root/SandboxALE-AAPP_2019/server/src/rainbow/message.$$
    fi
}





########
# MAIN #
########
if [ $# -lt 2 ] || [ $# -gt 3 ]; then
    echo "Syntax: $0 create VLAB## [email] | delete VLAB##"
    exit
else #Let's make it easy to read
    ACTION=`echo ${1}|tr [A-Z] [a-z]`
    VLAB=`echo ${2}|tr [a-z] [A-Z]`
    if [ $# -eq 3 ]; then
        EMAIL=`echo ${3}|tr [A-Z] [a-z]`
fi


if [ ${ACTION} == "create" ]; then
    # Look for the company ID
    COMPANYID=$(rbw companies|grep -i ${VLAB}|tr -cd '[:print:]'|awk {' print $7 '}|cut -c5-28)
    
    if [ -z ${COMPANYID} ]; then
        echo "Did not find the company ID for VLAB $VLAB"
        log "$VLAB not found"
        exit 1
    fi
    
    log "********** $ACTION $VLAB $COMPANYID **********"

    # Create the users
    VLABmaj=$(echo ${VLAB} | tr [a-z] [A-Z])
    VLABmin=$(echo ${VLAB} | tr [A-Z] [a-z])
    PASSWORD="$(password)"
    log "${VLAB} ADMIN admin@${VLABmin}.dspp.al-enterprise.com ${PASSWORD}"
    email
    email "${VLAB} ADMIN admin@${VLABmin}.dspp.al-enterprise.com ${PASSWORD}"
    rbw create user -c ${COMPANYID} -a admin@${VLABmin}.dspp.al-enterprise.com ${PASSWORD} Admin ${VLABmaj}
    
    for SIP in {1001..1005}; do
        PASSWORD="$(password)"
        log "${VLAB} USER ${SIP}@${VLABmin}.dspp.al-enterprise.com ${PASSWORD}"
        email "${VLAB} USER ${SIP}@${VLABmin}.dspp.al-enterprise.com ${PASSWORD}"
        rbw create user -c ${COMPANYID} ${SIP}@${VLABmin}.dspp.al-enterprise.com ${PASSWORD} SIP ${SIP}
    done
    
    sendEmail
fi


if [ "$1" == "delete" ]; then
    log "********** $ACTION $VLAB $COMPANYID **********"
    # Look for all the users
    USERS=($(rbw users|grep -i "$2"|awk '{ print $9 }'))
    
    if [ -z ${USERS} ]; then
        echo "Did not find any users for $VLAB"
        log "$VLAB not found"
        exit 1
    fi
    
    # Delete the users and validate with return (\n)
    for USER in "${USERS[@]}"; do
      echo -ne '\n' | rbw delete user $(echo ${USER}|cut -c6-29) 
    done
fi


exit

