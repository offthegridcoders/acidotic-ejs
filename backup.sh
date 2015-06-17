#!/bin/bash
now="$(date +'%d-%m-%Y-%h-%m-%s')"
echo -e "\033[33mSaving acidotic Racings Firebase Database...\033[0m";
mkdir ./backup;
filename="./backup/""$now""-backup.json";
curl https://acidotic.firebaseio.com/.json\?format\=export >> $filename
echo -e '\033[33mSave Complete!\033[0m';