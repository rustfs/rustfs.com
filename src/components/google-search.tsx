'use client'

import { useState } from "react";

export default function GoogleSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md rounded-lg bg-white p-4 shadow-md"
    >
      <input
        type="text"
        placeholder="请输入搜索内容"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="grow rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="rounded-r-lg bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        搜索
      </button>
    </form>
  );
}


