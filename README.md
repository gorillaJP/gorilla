# monster
monster 3

#self signed certificate
openssl req -nodes -new -x509 -keyout server.key -out server.cert


https://www.comodo.com/login/comodo-members.php

user name : dim912

pwd :
1qaz@WSX


#export the key to a fle
openssl rsa -in private.pem -outform PEM -pubout -out public.pem


pm2

npm install pm2 -g



pm2 start appname
pm2 stop appname



Install ElasticSearch
----------------------


rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch


vi /etc/yum.repos.d/elasticsearch.repo

[elasticsearch-7.x]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md


sudo yum install elasticsearch


#start as a service
sudo -i service elasticsearch start
sudo -i service elasticsearch stop

#auto start at startup 
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable elasticsearch.service

#start with systemctl
sudo systemctl start elasticsearch.service
sudo systemctl stop elasticsearch.service

#status
sudo journalctl --unit elasticsearch

#check if up
curl http://localhost:9200/

#installation locaiton
/etc/elasticsearch



#config file location

/etc/elasticsearch/elasticsearch.yml



### INSTALL KIBANA ###########

sudo yum -y install kibana


sudo vim /etc/kibana/kibana.yml
 server.host: "0.0.0.0"
 server.name: "kibana.example.com"
 elasticsearch.url: "http://localhost:9200"

sudo systemctl enable --now kibana


http://ip-address:5601 


#allow firewall

sudo firewall-cmd --add-port=5601/tcp --permanent
sudo firewall-cmd --reload

sudo systemctl status kibana 1

#access kibana
 http://192.168.1.227:5601/app/kibana

