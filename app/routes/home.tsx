import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumaster" },
    { name: "description", content: "Incredibly smart resume anylyzer!" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading" py-16>
          <h1>Track your applications & Resume ratings</h1>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {" "}
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
