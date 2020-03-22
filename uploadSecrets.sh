#!/usr/bin/env bash

PREFIX="ucsb-demo-"

while IFS= read -r line
do
  SECRET_NAME=$(echo "$PREFIX$line" | cut -d '=' -f1 | awk '{print tolower($0)}')
  SECRET_VALUE=$(echo "$line" | cut -d '=' -f2)

  now secrets add "$SECRET_NAME" "$SECRET_VALUE"
done < <(grep -vE '^#' .env)
