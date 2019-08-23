#!/bin.bash

function log()
{
	if [[ "$VERBOSE" -eq 1 ]]; then
		echo "- $1"
	fi
	echo `date "+%Y.%m.%d %H:%M:%S"` "- $1" >> rainbow.log
}

log "$*"

exit