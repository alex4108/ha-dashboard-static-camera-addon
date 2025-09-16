FROM debian:bullseye-slim

# Install dependencies for Node and Chromium
RUN apt-get update && apt-get install -y \
      curl \
      wget \
      gnupg \
      ca-certificates \
      libnss3 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libx11-xcb1 \
      libxcomposite1 \
      libxdamage1 \
      libxrandr2 \
      libgbm1 \
      libasound2 \
      libpangocairo-1.0-0 \
      libcups2 \
      libdrm2 \
      libxshmfence1 \
      libexpat1 \
      libxfixes3 \
      libglib2.0-0 \
      libxcb1 \
      libx11-6 \
      libxext6 \
      libxrender1 \
      libfreetype6 \
      libfontconfig1 \
      nodejs \
      npm \
      && rm -rf /var/lib/apt/lists/*

# Install Playwright and Chromium
RUN npm install -g playwright
RUN npx playwright install chromium

# Copy scripts
COPY run.sh /run.sh
COPY run.js /run.js

CMD [ "/run.sh" ]
