#!/bin/bash
echo -e "\033[33mSaving acidotic Racings Firsebase Database...\033[0m";
curl https://acidotic.firebaseio.com/.json\?format\=export >> output.txt
echo -e '\033[33mSave Complete!\033[0m';