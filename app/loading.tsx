export default function Loading() {
  return (
    <main
      className="loading-state"
      aria-busy="true"
      aria-label="Loading the morning edition"
    >
      <span className="wordmark">
        Mente com Cuidado<span>Â®</span>
      </span>
      <div className="skeleton" />
      <p className="eyebrow">Preparando seu conteúdo…</p>
    </main>
  );
}


