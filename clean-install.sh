#!/bin/bash

echo "Removing all node_modules and lock files..."

rm -rf node_modules package-lock.json

find . -type d -name "node_modules" -not -path "./node_modules/*" -exec rm -rf {} +

find . -type f -name "package-lock.json" -not -path "./node_modules/*" -exec rm -f {} +

echo "Cleanup complete. Installing fresh dependencies..."

npm install

echo "Primsa generate..."

npm run db:generate

echo "All dependencies reinstalled cleanly!"
