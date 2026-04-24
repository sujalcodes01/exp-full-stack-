const stages = [
  "Pull request triggers the workflow",
  "Tests run on Node.js 18",
  "Docker image builds and pushes to GHCR",
  "Slack receives deployment status"
];

export default function App() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Experiment 3.2.2</p>
        <h1>CI/CD Pipeline with GitHub Actions</h1>
        <p className="lead">
          This React app demonstrates automated testing, Docker image delivery,
          and deployment notifications in one GitHub Actions workflow.
        </p>

        <div className="chip-row" aria-label="pipeline summary">
          <span>React + Vite</span>
          <span>GitHub Actions</span>
          <span>GHCR</span>
          <span>Slack</span>
        </div>
      </section>

      <section className="panel">
        <h2>Pipeline Stages</h2>
        <ol>
          {stages.map((stage) => (
            <li key={stage}>{stage}</li>
          ))}
        </ol>
      </section>

      <section className="panel">
        <h2>Expected Output</h2>
        <ul>
          <li>Automated testing on PR creation</li>
          <li>Docker image pushed to GitHub Container Registry</li>
          <li>Slack notifications after deployment</li>
          <li>Tags generated as both latest and commit SHA</li>
        </ul>
      </section>
    </main>
  );
}
