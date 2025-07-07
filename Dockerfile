FROM node:18
WORKDIR /app/price-scraper
COPY package.json ./
RUN npm install
RUN npx playwright install --with-deps
COPY . .
EXPOSE 4002
CMD [ "npm","run","start"]