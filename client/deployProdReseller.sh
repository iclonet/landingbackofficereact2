cp -r ./flavor/reseller/* ./public/
yarn react-scripts build
cd build/
tar czf www.tar.gz *
scp -P 30022 www.tar.gz root@95.216.21.58:/tmp
ssh -t -p 30022 root@95.216.21.58  "sudo rm -Rf /var/www/webusers/resellerclient.com/webspace/* && cd /var/www/webusers/resellerclient.com/webspace && sudo cp /tmp/www.tar.gz . && sudo tar xzf www.tar.gz && sudo rm -f www.tar.gz"
