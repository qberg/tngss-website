scp -i "~/.ssh/tngss_pem.pem" -r dist/\* ec2-user@tngss.startuptn.in:/home/ec2-user/workspace/tngss_web/build
scp -i "~/.ssh/tngss_pem.pem" -r dist/\* ubuntu@3.109.128.152:/home/ubuntu/code-base/tngss_web/build/
