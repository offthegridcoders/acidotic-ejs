#!/bin/bash
chmod +x backup.sh bin/www run.sh
echo 'Installing NPM Module Dependencies'
sudo npm install
echo 'NPM install complete!'
./run.sh