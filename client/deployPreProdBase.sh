cp -r ./flavor/base/* ./public/
yarn react-scripts build
cd build/
tar czf www.tar.gz *
scp www.tar.gz root@95.216.8.36:/root
ssh -t root@95.216.8.36 "rm -Rf /var/www/webusers/staging.reportes.agildataonline.com/webspace/* && cd /var/www/webusers/staging.reportes.agildataonline.com/webspace/ &&  cp /root/www.tar.gz . &&  tar xzf www.tar.gz &&  rm -f www.tar.gz"
