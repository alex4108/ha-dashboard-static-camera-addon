#!/bin/bash

URL=${URL:-"http://homeassistant.local:8123/lovelace/0?auth_token=YOUR_TOKEN"}
TIME_SLEEP=${INTERVAL:-10}
TIME_BUDGET=${BUDGET:-10000}
OUT="/config/www/dashboard.jpg"

printenv

echo "Starting dashboard capture: $URL every $INTERVAL seconds"

while true; do
  xvfb-run --server-args="-screen 0 1920x1080x24" \
    chromium --headless --disable-gpu --no-sandbox --virtual-time-budget=$TIME_BUDGET \
    --screenshot="$OUT" --user-data-dir=/tmp/chromium "$URL"

  echo "Sleep $INTERVAL" until next run...
  sleep "$INTERVAL"
done
