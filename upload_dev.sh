pnpm run build:h5

dir=./dist/build/h5

chmod 400 ./ai-dev.pem
scp -i ./ai-dev.pem -r "$dir"/ ec2-user@18.142.49.247:/home/ec2-user/dist/
ssh -i ./ai-dev.pem ec2-user@18.142.49.247 "sudo rm -rf /www/h5"
ssh -i ./ai-dev.pem ec2-user@18.142.49.247 "sudo mv -f /home/ec2-user/dist/h5 /www"
