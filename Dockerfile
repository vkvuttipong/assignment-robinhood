FROM {DOCKER_BASE_IMAGE}
# Base image node:16-alpine3.12

ENV NODE_ENV={NODE_ENV}

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
RUN npm uninstall -g tedious
RUN npm uninstall tedious
RUN npm install tedious

# Install LibreOffice & Common Fonts
RUN apk --no-cache add bash libreoffice util-linux \
  ttf-droid-nonlatin ttf-droid ttf-dejavu ttf-freefont ttf-liberation && \
  rm -rf /var/cache/apk/*

RUN mkdir -p /usr/share/fonts/truetype/custom-fonts    
RUN find mailContent/fonts/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/custom-fonts/ \; || return 1  


# Port
EXPOSE 4000

CMD {DOCKER_RUN_CMD}

