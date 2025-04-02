#!/bin/bash

# CD to ec2-user home directory
cd /home/ec2-user

# update the OS
echo "Updating OS"
sudo yum update -y

# install docker
echo "Installing Docker"
sudo yum install -y docker

# start docker service and add ec2 user to service group
echo "Setting Up Docker Agent"
sudo service docker start
sudo usermod -aG docker ec2-user

# install git
echo "Installing Git"
sudo yum install -y git

# clone project into directory 
echo "Cloning Project"
git clone https://github.com/BalisongFlippingHub/BalisongFlippingHubWeb.git

# cd into project
cd BalisongFlippingHubWeb

# build application docker container
echo "Initiating project build and run."
sudo docker build -t web-server .

# run image
echo "Running Web Server"
sudo docker run -d -p 80:80 web-server