#!/bin/bash

function log()
{
	echo `date "+%Y.%m.%d %H:%M:%S"` "- $1" >> /root/SandboxALE-AAPP_2019/server/src/rainbow/rainbow.log
}

log "$*"

exit