#!/bin/bash

URL=${URL:-"http://homeassistant.local:8123/lovelace/0"}
INTERVAL=${INTERVAL:-10}
OUT="/config/www/dashboard.jpg"

echo "Starting dashboard capture: $URL every $INTERVAL seconds"

while true; do
  xvfb-run --server-args="-screen 0 1920x1080x24" \
    chromium --headless --disable-gpu --no-sandbox \
    --screenshot="$OUT" "$URL"
  sleep "$INTERVAL"
done
