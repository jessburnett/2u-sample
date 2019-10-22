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