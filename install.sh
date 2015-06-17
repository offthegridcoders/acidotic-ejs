#!/bin/bash
./backup.sh
echo 'Installing NPM Module Dependencies';
sudo npm install
echo 'NPM install complete!';
echo 'LOADING APP....';
echo -e '\033[1;33m###################################################\033[0m';
echo -e '\033[1;33m#                                                 #\033[0m';
echo -e '\033[1;33m#                \033[1;33macidotic RACING                  #\033[0m';
echo -e '\033[1;33m#\033[0m             \033[37mNode/Express/ejs app\033[0m                \033[1;33m#\033[0m';
echo -e '\033[1;33m#                                                 #\033[0m';
echo -e '\033[1;33m#\033[0m                \033[37mby Stephen Young\033[0m                 \033[1;33m#\033[0m';
echo -e '\033[1;33m#                                                 #\033[0m';
echo -e '\033[1;33m###################################################\033[0m';
echo ' ';
DEBUG=acidotic:* ./bin/www
echo 'Thank you for using the app! Goodbye.';