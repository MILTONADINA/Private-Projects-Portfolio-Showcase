# DevOPs: scoped execution record

**Date:** October 1, 2026

**Revision:** [`3ac20df17ebfc8e7f1614c23a1bbeecbaff7084e`](https://github.com/MILTONADINA/DevOPs/commit/3ac20df17ebfc8e7f1614c23a1bbeecbaff7084e)

**Environment:** Node 26.3.0, npm 11.16.0; isolated checkout; dependency lifecycle scripts disabled.

## Runtime checks

From `runtime/`, the following selected files were passed to `vitest run`. **187 tests passed; 0 failed; 0 pending.**

| Test file | Passed |
| --- | ---: |
| `test/audit/audit-engine.test.ts` | 8 |
| `test/audit/git-attestation.test.ts` | 25 |
| `test/memory/manager.test.ts` | 8 |
| `test/memory/promote.test.ts` | 11 |
| `test/memory/session-start-context.test.ts` | 14 |
| `test/memory/source-graph.test.ts` | 5 |
| `test/memory/warm-pipeline.test.ts` | 1 |
| `test/pruner/context-manager.test.ts` | 9 |
| `test/pruner/provenance-select.test.ts` | 82 |
| `test/proxy/message-memory.test.ts` | 12 |
| `test/proxy/provider-router.test.ts` | 12 |

The [test source at this revision](https://github.com/MILTONADINA/DevOPs/tree/3ac20df17ebfc8e7f1614c23a1bbeecbaff7084e/runtime/test) uses injected models, databases and provider behavior. Message-route checks use in-process Fastify requests. Memory retention includes a decision recalled after 50 later turns with a fake extractor and database.

## Jev and failure classification

From the repository root:

```sh
node --test tests/jev/jev-client.test.mjs \
  tests/jev/triage-claims.test.mjs \
  tests/graph-resilience/classify-jev.test.mjs \
  tests/graph-resilience/classify.test.mjs
```

**44 tests passed; 0 failed; 0 skipped.** These check typed API requests, credential-pattern refusal, bounded retries/timeouts, confidence escalation and deterministic-first classification. All provider calls are injected; no live Jev request was made. [Jev test source](https://github.com/MILTONADINA/DevOPs/tree/3ac20df17ebfc8e7f1614c23a1bbeecbaff7084e/tests/jev).

## Real-source indexing demonstration

The repository's [`indexSourceFiles`](https://github.com/MILTONADINA/DevOPs/blob/3ac20df17ebfc8e7f1614c23a1bbeecbaff7084e/runtime/src/memory/source-graph.ts) function parsed tracked `.ts`, `.tsx`, `.js`, `.jsx`, `.rs` and `.py` files under `runtime/src`, `runtime/rust` and `runtime/evals/harness`:

| Output | Count |
| --- | ---: |
| Source files / File entities | 116 |
| Function entities | 459 |
| DECLARES edges | 459 |
| DEPENDS_ON edges | 232 |
| Edges with unresolved endpoints | 0 |

This exercises deterministic declaration/dependency indexing over actual code. It does not run the graph database, embedding model or optional semantic summaries.

## Interpretation

These results support the specified implementation paths. They are not a full-suite result, live provider compatibility test, database isolation audit, benchmark quality gate, deployment result or token-savings measurement. Context pruning still does not alter normal forwarded requests. Later local payment-removal work is outside this main-revision binding.

[Back to the case study](README.md)
