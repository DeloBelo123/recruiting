# BackendLib Dependencies

Dieser Ordner enthält wiederverwendbare Backend-Libraries. Um alle benötigten Dependencies zu installieren, führe im **Root deines Projekts** (nicht im BackendLib-Ordner) folgenden Befehl aus:

## Installation

```bash
npm install --legacy-peer-deps axios zod dotenv @supabase/supabase-js stripe @stripe/stripe-js @langchain/core @langchain/ollama @langchain/groq @langchain/openai @langchain/anthropic @langchain/community @langchain/classic @langchain/textsplitters zod-validation-error redis pino pino-pretty web-push @modelcontextprotocol/sdk next
```

Oder installiere die TypeScript-Typen zusätzlich:

```bash
npm install --save-dev --legacy-peer-deps @types/redis @types/web-push
```

## Warum `--legacy-peer-deps`?

Die LangChain-Pakete haben Versionskonflikte. Der Flag `--legacy-peer-deps` umgeht diese und ermöglicht die Installation.

## Dependencies-Liste

Siehe `dependencies.txt` für eine vollständige Liste aller benötigten Pakete.

