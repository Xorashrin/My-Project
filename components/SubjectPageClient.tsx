'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { QuestionCard } from '@/components/QuestionCard';
import { normalizeText } from '@/lib/utils';
import { useStudyStore } from '@/store/useStudyStore';
import type { SubjectData } from '@/data';

export function SubjectPageClient({ subject }: { subject: SubjectData }) {
  const [query, setQuery] = useState('');

  const bookmarks = useStudyStore((state) => state.bookmarks[subject.id] ?? []);
  const toggleBookmark = useStudyStore((state) => state.toggleBookmark);

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return subject.questions;

    return subject.questions.filter((question) => {
      return (
        normalizeText(question.question).includes(normalizedQuery) ||
        question.options.some((option) => normalizeText(option).includes(normalizedQuery))
      );
    });
  }, [query, subject.questions]);

  return (
    <div className="space-y-4">
      <section className="glass rounded-xl p-5">
        <h1 className="text-2xl font-bold">{subject.name}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {subject.questions.length} total questions • {bookmarks.length} bookmarked
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-lg border border-slate-300 bg-white/70 px-3 py-2 text-sm outline-none ring-brand-400 focus:ring dark:border-slate-700 dark:bg-slate-900/50"
          />
          <Link href={`/quiz/${subject.id}`} className="rounded-lg bg-brand-600 px-4 py-2 text-center text-white">
            Start Quiz
          </Link>
          <Link
            href={`/quiz/${subject.id}?mode=exam`}
            className="rounded-lg border border-brand-500 px-4 py-2 text-center text-brand-700 dark:text-violet-300"
          >
            Exam Mode
          </Link>
        </div>
      </section>

      <section className="grid gap-3">
        {filteredQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            readonly
            bookmarked={bookmarks.includes(question.id)}
            onToggleBookmark={() => toggleBookmark(subject.id, question.id)}
          />
        ))}
        {filteredQuestions.length === 0 && (
          <p className="glass rounded-xl p-5 text-sm">No questions matched your search query.</p>
        )}
      </section>
    </div>
  );
}
