import { useEffect, useState } from "react";
import { getCandidateByEmail } from "./api/candidates";
import { getJobsList } from "./api/jobs";

const CANDIDATE_EMAIL = "ignaciogonzalezinigo@gmail.com";

export default function App() {
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");


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

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      setJobsLoading(true);
      setJobsError("");

      try {
        const data = await getJobsList();
        if (!cancelled) setJobs(data);
      } catch (err) {
        if (!cancelled) setJobsError(err?.message || "Error inesperado");
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    }

    loadJobs();

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

      <section style={{ marginTop: 16 }}>
        <h2>Step 3 — Jobs</h2>

        {jobsLoading && <p>Cargando posiciones…</p>}

        {!jobsLoading && jobsError && (
          <p style={{ color: "crimson" }}>Error: {jobsError}</p>
        )}

        {!jobsLoading && !jobsError && jobs.length > 0 && (
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                {job.title} <small>({job.id})</small>
              </li>
            ))}
          </ul>
        )}
      </section>

    </main>
  );
}
