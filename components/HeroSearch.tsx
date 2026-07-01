"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();
  return (
    <form
      className="hero-search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/meal-plans" + (q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""));
      }}
    >
      <input
        type="text"
        placeholder="Search dishes, cuisines, or cooks near you…"
        aria-label="Search food"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit" className="btn btn-orange">Find Food</button>
    </form>
  );
}
