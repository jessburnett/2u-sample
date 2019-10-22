FROM node:10

#Create app dir
WORKDIR /usr/src/app

#install app dependencies
COPY package*.json ./

RUN npm install
#if building code for prod 
# RUN npm ci --only=production

#bundle app source 
COPY . .

#Your app binds to port 5000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5000

#runtime command
CMD [ "node", "server.js" ]

#BUILD
# docker build -t <your username>/node-web-app .
# docker images command should show your latest image

#RUN
#running your image with -d runs the container in detached mode, 
#leaving the container running in the background. 
#The -p flag redirects a public port to a private port inside the container. 
#Run the image you previously built:
# docker run -p 49160:5000 -d <your username>/node-web-app

#TEST
# To test your app, get the port of your app that Docker mapped:
# docker ps
#Now you can call your app using curl (install if needed via: sudo apt-get install curl):
# curl -i localhost:49160

#DOCUMENTATION AT https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
