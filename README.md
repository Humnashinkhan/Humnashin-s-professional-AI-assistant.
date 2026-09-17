# 🤖 Humnashin AI Assistant

An AI-powered professional portfolio assistant that allows recruiters, visitors, and developers to interact with Humnashin's professional profile through a conversational chat interface.

The project combines a **React frontend**, **n8n AI workflow automation**, **Pinecone vector search**, **Google Gemini**, and **Retrieval-Augmented Generation (RAG)** to provide context-aware answers about Humnashin's professional experience, skills, projects, and technical background.

---

## ✨ Features

- 💬 Conversational AI chat interface
- 🧠 Retrieval-Augmented Generation (RAG)
- 🔎 Semantic search using Pinecone Vector Database
- 🤖 Google Gemini-powered AI responses
- ⚡ n8n workflow automation as the backend
- 🧾 Knowledge-base-based responses
- 💾 Conversation memory using n8n Simple Memory
- 🔐 Environment variables for configuration
- 📱 Responsive React frontend
- 🛡️ Designed to avoid exposing AI API credentials in the frontend

---

## 🏗️ Architecture

```text
                 ┌─────────────────────┐
                 │    React Frontend   │
                 │     Chat Interface  │
                 └──────────┬──────────┘
                            │
                            │ HTTP Request
                            ▼
                 ┌─────────────────────┐
                 │     n8n Chat        │
                 │      Trigger        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      AI Agent       │
                 └──────┬──────┬───────┘
                        │      │
             ┌──────────┘      └───────────┐
             ▼                              ▼
   ┌──────────────────┐          ┌──────────────────┐
   │  Simple Memory   │          │ Pinecone Vector  │
   │                  │          │      Store       │
   └──────────────────┘          └────────┬─────────┘
                                          │
                                          ▼
                                ┌──────────────────┐
                                │ Gemini Embeddings│
                                └──────────────────┘

                        AI Agent
                           │
                           ▼
                 ┌──────────────────┐
                 │ Google Gemini     │
                 │   Chat Model      │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ AI Response      │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ React Chat UI    │
                 └──────────────────┘
