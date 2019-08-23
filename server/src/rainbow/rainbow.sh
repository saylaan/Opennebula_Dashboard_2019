#!/bin.bash

function log()
{
	echo `date "+%Y.%m.%d %H:%M:%S"` "- $1" >> rainbow.log
}

log "$*"

exit