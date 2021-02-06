#!/bin/bash


echo "* * * * * python ./main.py  > /proc/1/fd/1 2>/proc/1/fd/2
# This extra line makes it a valid cron" > scheduler.txt

crontab scheduler.txt
echo "done with crontab"
echo "running flask"

flask run --host=0.0.0.0 --port=5000