FROM node:20-bullseye-slim

# Install Chromium for Playwright
RUN apt-get update && \
    apt-get install -y wget libnss3 libatk1.0-0 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libasound2 libpangocairo-1.0-0 libcups2 libdrm2 libxshmfence1 libexpat1 libxfixes3 libglib2.0-0 libxcb1 libx11-6 libxext6 libxrender1 libxrandr2 libfreetype6 libfontconfig1 curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install Playwright
RUN npm install -g playwright

# Copy run script
COPY run.js /run.js
CMD ["node", "/run.js"]
