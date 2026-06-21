# ForgeStudy - AI Study Assistant

## Problem Statement

Students use multiple disconnected tools for studying, note-taking, revision, and task management. This project combines AI-powered learning assistance with task management into a single platform.

## Features

* AI Chat
* PDF Summary Generation
* Quiz Generation
* Kanban Task Board
* Slack Integration
* Hermes Orchestration
* OpenClaw Worker Agents

## Architecture

User
↓
Slack
↓
Hermes (Planner)
↓
OpenClaw (Executor)
↓
Study Assistant UI

## Tech Stack

* React (Vite)
* Node.js
* Express
* Ollama
* Hermes
* OpenClaw
* Slack

## Demo Flow

1. Upload PDF
2. Generate Summary
3. Generate Quiz
4. Create Study Tasks
5. Track Progress in Kanban Board
