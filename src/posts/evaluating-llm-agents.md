---
title: "Evaluating LLM Agents with Causal Slices"
date: "2024-08-15"
summary: "How causal slicing and targeted fixtures reveal reliability gaps in agent loops."
---

When agent loops combine perception, planning, and execution, blended metrics often hide regression sources.

I lean on causal slicing: break loops into perception, recall, planning, and action fixtures. Each fixture produces scoped telemetry so a single red test tells you where to drill.

Key ingredients:

- Deterministic mocks for upstream APIs
- Scenario sampling that mirrors production priors
- Structured prompts logged for offline triage

With these in place, you can gate launches on actionable signals instead of dashboards that blend everything together.
