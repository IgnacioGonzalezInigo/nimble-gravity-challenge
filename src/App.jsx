import { useEffect, useState } from "react";
import { getCandidateByEmail } from "./api/candidates";

const CANDIDATE_EMAIL = "ignaciogonzalezinigo@gmail.com";

export default function App() {
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCandidate() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getCandidateByEmail(CANDIDATE_EMAIL);
        if (!cancelled) setCandidate(data);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Error inesperado");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadCandidate();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Nimble Gravity — Challenge</h1>

      <section style={{ marginTop: 16 }}>
        <h2>GET CANDIDATE BY EMAIL</h2>

        {isLoading && <p>Cargando datos del candidato…</p>}

        {!isLoading && error && (
          <p style={{ color: "crimson" }}>Error: {error}</p>
        )}

        {!isLoading && !error && candidate && (
          <pre
            style={{
              marginTop: 12,
              padding: 12,
              background: "#f6f6f6",
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(candidate, null, 2)}
          </pre>
        )}
      </section>
    </main>
  );
}
