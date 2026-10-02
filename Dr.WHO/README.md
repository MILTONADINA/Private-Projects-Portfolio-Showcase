# Doctor Who Knowledge API

**Public team coursework · Frontend, AI and authentication contributor**

## Project and contribution

Node.js · Express · Sequelize · Supabase (PostgreSQL) · OpenAI. A 16-model relational
schema with JWT-protected mutation routes and a schema-aware OpenAI question-answering endpoint.
Authentication-route behavior is checked with Jest + Supertest. Public source: https://github.com/MILTONADINA/Dr.WHO

**Team context:** CMSC 4323 final project by Jonathan Muhire, Milton Adina, and Magnani Fabiola.
My documented contribution includes frontend/OpenAI integration, deployment configuration, and testing, with
additional authentication and PostgreSQL migration work recorded in the Git history. The 16-model
schema belongs to the team project; it is not presented as sole-authored work.

## Implementation decisions

The project connects a relational knowledge model to an interface for browsing records and asking questions. The LLM endpoint supplies table relationships and sampled records to the model, then returns an
answer; its current request path does **not** generate and execute SQL. The separate query service
implements relational joins and detail queries. The preserved screenshot/log records the May 2026
three-test Jest run.

## Test evidence

**October 1, 2026:** revision `8b1012d9` passed the three
Jest/Supertest authentication-route tests with mocked database calls. This checks route behavior;
it does not verify a live database, deployment, or OpenAI service.

---

## In this folder
<!-- in-this-folder -->

- [`drwho-jest-passing.png`](./drwho-jest-passing.png) - 🖼️ test-run screenshot
- [`drwho-jest-log.txt`](./drwho-jest-log.txt) - 📋 raw Jest run log

[← All case studies](../README.md) · [More coursework](../Coursework/README.md) · [Team contribution record](https://github.com/MILTONADINA/Dr.WHO/blob/8b1012d9ae2a3c9f5c7a0c3b1acd808ecacf6a73/CONTRIBUTIONS.md)
