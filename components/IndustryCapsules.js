"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieGrid from "./MovieGrid";

// data: { hollywood: [...movies], bollywood: [...movies], ... }
// industries: [{ key: "hollywood", label: "Hollywood" }, ...]
export default function IndustryCapsules({ data, industries }) {
  const [active, setActive] = useState(industries[0]?.key);

  const activeMovies = data[active] || [];

  return (
    <div>
      {/* Capsule / pill bar — horizontally scrollable on mobile like YouTube chips */}
      <div
        className="mb-6 flex gap-2 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "thin" }}
        role="tablist"
        aria-label="Browse by industry"
      >
        {industries.map((industry) => {
          const isActive = industry.key === active;
          return (
            <button
              key={industry.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(industry.key)}
              className={`relative flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "border border-stage-600 bg-stage-800 text-mist-300 hover:border-velvet-500/60 hover:text-mist-100"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="industry-capsule-bg"
                  className="absolute inset-0 rounded-full bg-velvet-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{industry.label}</span>
            </button>
          );
        })}
      </div>

      {/* Movie grid for the currently selected industry, with fade/slide transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <MovieGrid
            movies={activeMovies}
            emptyMessage="No titles found for this category right now."
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
