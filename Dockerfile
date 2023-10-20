FROM node:18

 

WORKDIR /usr/src

# Copy the nodejs package.json into WORKDIR
COPY package*.json ./

# Bundle app source
COPY . .

# Install all the dependencies
RUN apk add qpdf
RUN apk add --no-cache tzdata
RUN apk add --no-cache bash
RUN cp -f /usr/share/zoneinfo/Asia/Bangkok /etc/localtime
RUN echo "Asia/Bangkok" >  /etc/timezone
RUN date
RUN npm install 
 

 


# Port
EXPOSE 4000

CMD {DOCKER_RUN_CMD}

