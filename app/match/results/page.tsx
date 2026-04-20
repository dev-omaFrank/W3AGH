"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Award } from "lucide-react";

interface Grant {
  id: string;
  title: string;
  description: string;
  ecosystem: string;
  funding: string;
  matchScore: number;
}

interface MatchedGrantCardProps {
  grant: Grant;
}

const MatchedGrantCard = ({ grant }: MatchedGrantCardProps) => {
  const scoreColorClass =
    grant.matchScore >= 80
      ? "bg-green-100 text-green-800"
      : grant.matchScore >= 60
      ? "bg-yellow-100 text-yellow-800"
      : "bg-blue-100 text-blue-800";

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden">
      <div className="relative flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${scoreColorClass}`}
          >
            {grant.matchScore}% Match
          </span>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-gray-100 text-gray-400">
            {grant.ecosystem}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
          {grant.title}
        </h3>

        <p className="text-sm text-gray-800 mb-6 leading-relaxed">
          <span className="font-semibold text-primary">
            Why this matches:
          </span>{" "}
          {grant.description}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Funding
            </span>
            <span className="text-sm font-bold text-gray-900">
              {grant.funding}
            </span>
          </div>

          {/* Disabled link for now (no real IDs yet) */}
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-300">
            →
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MatchResultsPage() {
  const [matchedGrants, setMatchedGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("matches");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        const arrayData = parsed.matches;

        const formatted: Grant[] = arrayData.map(
          (item: any, index: number) => ({
            id: index.toString(),
            title: item.title || "Untitled Grant",
            description:
              item.explanation || "No explanation provided.",
            funding: item.funding || "Not specified",
            ecosystem: item.organization || "General",
            matchScore: item.score || 0,
          })
        );

        const sorted = formatted.sort(
          (a, b) => b.matchScore - a.matchScore
        );

        setMatchedGrants(sorted);
      } catch (err) {
        console.error("Error parsing AI results:", err);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Finding the best grants for you...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 text-primary mb-6 border border-primary/10">
            Your Matches
          </div>

          <h1 className="text-4xl font-black text-gray-900 sm:text-6xl mb-6 leading-tight">
            Top Grant Opportunities <br />
            <span className="text-primary">
              For Your Project
            </span>
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed">
            Based on your profile, here are the grants that best
            align with your goals and needs.
          </p>
        </div>

        {/* Results */}
        {matchedGrants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {matchedGrants.map((grant) => (
              <MatchedGrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <div className="inline-flex p-6 rounded-full bg-white shadow-sm mb-6">
              <Award className="w-10 h-10 text-gray-300" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No matches found
            </h3>

            <p className="text-gray-500 text-lg">
              Try submitting the form again.
            </p>

            <Link
              href="/match"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-lg"
            >
              Go Back
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 text-center">
          <Link
            href="/grants"
            className="group inline-flex items-center text-lg font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Browse All Grants Anyway
          </Link>
        </div>
      </div>
    </div>
  );
}