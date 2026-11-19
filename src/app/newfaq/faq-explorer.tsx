"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { faqs } from "@/lib/faqs";

const categories = ["General", "SEO", "Web", "Contact"] as const;
type Category = "All" | (typeof categories)[number];

export function FaqExplorer() {
  const [category, setCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(() => new Set());
  const reduceMotion = useReducedMotion();
  const query = search.trim().toLocaleLowerCase();
  const matches = faqs
    .map((faq, index) => ({ ...faq, index }))
    .filter((faq) => (category === "All" || faq.category === category) &&
      (!query || faq.q.toLocaleLowerCase().includes(query) || faq.a.toLocaleLowerCase().includes(query)));

  function toggleQuestion(index: number) {
    setOpenQuestions((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <>
      <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Frequently Asked Questions</p>
              <h1 className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.55rem]">
                Got Questions? <span className="text-[#0f6dff]">We&apos;ve Got Answers.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18.5px]">
                Find clear answers about our services, process and how Webamazee can help your business grow.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pb-1">
              <label htmlFor="newfaq-search" className="mb-2 block text-[13px] font-bold text-[#0b1528]">Search questions and answers</label>
              <div className="relative">
                <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input id="newfaq-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your question..." className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-[15px] text-[#0b1528] shadow-[0_10px_30px_-20px_rgba(11,21,40,0.25)] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff] focus:ring-4 focus:ring-[#0f6dff]/10" />
              </div>
              <p className="mt-2 text-[12px] text-slate-500">Search all topics, or choose a category below.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10" aria-labelledby="questions-heading">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Explore by Topic</p>
              <h2 id="questions-heading" className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">Find the answers you need.</h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-600">Browse a topic or search for a question. Select a question to reveal its answer.</p>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter questions by category">
                {(["All", ...categories] as Category[]).map((item) => (
                  <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] ${category === item ? "border-[#0f6dff] bg-[#0f6dff] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-[#0f6dff]/50 hover:text-[#0f6dff]"}`}>
                    {item}
                  </button>
                ))}
              </div>
              <p aria-live="polite" className="mt-4 text-[13px] font-medium text-slate-500">{matches.length} {matches.length === 1 ? "question" : "questions"}{category !== "All" ? ` in ${category}` : ""}</p>
              {matches.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-6">
                  <h3 className="font-display text-xl font-bold text-[#0b1528]">No matching questions found.</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">Try a different search or view all categories.</p>
                  <button type="button" onClick={() => { setSearch(""); setCategory("All"); }} className="mt-4 text-[14px] font-bold text-[#0f6dff] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]">Clear search and filters</button>
                </div>
              ) : (
                <div className="mt-5 space-y-8">
                  {categories.map((group) => {
                    const items = matches.filter((faq) => faq.category === group);
                    if (!items.length) return null;
                    return (
                      <div key={group}>
                        <h3 className="mb-3 font-display text-xl font-bold tracking-[-0.02em] text-[#0b1528]">{group}</h3>
                        <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/90 bg-white">
                          {items.map((faq) => {
                            const isOpen = openQuestions.has(faq.index);
                            const buttonId = `newfaq-question-${faq.index}`;
                            const panelId = `newfaq-answer-${faq.index}`;
                            return (
                              <div key={faq.index}>
                                <h4>
                                  <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggleQuestion(faq.index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[15px] font-bold leading-relaxed text-[#0b1528] transition-colors hover:text-[#0f6dff] focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] sm:px-6 sm:text-[16px]">
                                    <span>{faq.q}</span>
                                    <span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-[#0f6dff] text-white" : "bg-[#f1f5fb] text-[#0f6dff]"}`}><Plus className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} /></span>
                                  </button>
                                </h4>
                                <motion.div id={panelId} role={isOpen ? "region" : undefined} aria-labelledby={isOpen ? buttonId : undefined} aria-hidden={!isOpen} initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }} className="overflow-hidden">
                                  <p className="max-w-3xl px-5 pb-5 text-[15px] leading-relaxed text-slate-600 sm:px-6">{faq.a}</p>
                                </motion.div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
