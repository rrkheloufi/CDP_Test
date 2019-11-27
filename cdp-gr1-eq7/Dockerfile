FROM node:10

RUN git clone https://github.com/elafosse/CDP_Dev

WORKDIR ./CDP_Dev/cdp-gr1-eq7/

RUN npm install

EXPOSE 3000
CMD ["node",  "./backend/initApp.js"]
