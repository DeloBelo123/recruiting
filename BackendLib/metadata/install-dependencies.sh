#!/bin/bash

# BackendLib Dependencies Installer
# Führe dieses Script im ROOT deines Projekts aus (nicht im BackendLib-Ordner)

echo "📦 Installiere BackendLib Dependencies..."

npm install --legacy-peer-deps \
  axios \
  zod@^3.25.0 \
  dotenv \
  @supabase/supabase-js \
  stripe \
  @stripe/stripe-js \
  @langchain/core \
  @langchain/ollama \
  @langchain/groq \
  @langchain/openai \
  @langchain/anthropic \
  @langchain/community \
  @langchain/classic \
  @langchain/textsplitters \
  zod-validation-error \
  redis \
  pino \
  pino-pretty \
  web-push \
  @modelcontextprotocol/sdk \
  next

echo ""
echo "📦 Installiere TypeScript-Typen..."

npm install --save-dev --legacy-peer-deps \
  @types/redis \
  @types/web-push

echo ""
echo "✅ Alle BackendLib Dependencies wurden installiert!"

