FROM node:18

# system setting
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y apt-utils \
  && apt-get autoclean -y \
  && apt-get autoremove -y

# Default values
ARG NODE_ENV=development
ARG TIMEZONE=Asia/Bangkok

ENV NODE_ENV=${NODE_ENV}
ENV TZ=${TIMEZONE}

RUN cp /usr/share/zoneinfo/$TZ /etc/localtime \
  && dpkg-reconfigure -f noninteractive tzdata

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
RUN npm install -g --force yarn

# Install app dependencies
COPY --chown=nodejs:nodejs ./package.json /usr/src/app/
RUN yarn install --ignore-engines

# Bundle app source
WORKDIR /usr/src/app
COPY --chown=nodejs:nodejs . /usr/src/app

EXPOSE 3000

CMD [ "yarn", "start" ]

LABEL maintainer="Chinasee BOONYATANG <chinasee@gmail.com>"
