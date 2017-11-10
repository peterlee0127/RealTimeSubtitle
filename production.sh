#!/usr/bin/env bash
export NODE_ENV=production
export NODE_CLUSTER_SCHED_POLICY=rr
pm2 start --merge-logs --log-date-format="YYYY-MM-DD HH:mm Z" -n realtime-subtitle app.js
