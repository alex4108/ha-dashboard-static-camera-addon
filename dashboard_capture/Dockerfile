FROM debian:bullseye-slim

# Install Chromium + X virtual framebuffer
RUN apt-get update && \
    apt-get install -y chromium chromium-driver xvfb cron bash && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY run.sh /run.sh
RUN chmod +x /run.sh

CMD [ "/run.sh" ]
