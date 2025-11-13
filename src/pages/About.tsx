export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="text-ink/80 mt-4">
        I work on evaluation-heavy ML systems: LLMs, multimodal perception, and human-in-the-loop tooling. This portfolio highlights
        research prototypes and productionized experiments.
      </p>
      <ul className="list-disc ml-6 mt-6 text-ink/80">
        <li>Languages: Python, TypeScript, Kotlin</li>
        <li>ML: PyTorch, JAX, TensorFlow</li>
        <li>Data: BigQuery, Spark</li>
        <li>Cloud: Vertex AI, GCP</li>
      </ul>
    </div>
  )
}
