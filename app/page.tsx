'use client';

import { SubjectCard } from '@/components/SubjectCard';
import { getSubjects } from '@/lib/utils';
import { useStudyStore } from '@/store/useStudyStore';

export default function HomePage() {
  const subjects = getSubjects();
  const progress = useStudyStore((state) => state.progress);

  return (
    <div className="space-y-6">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-3xl font-bold tracking-tight">Level up your studies</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-700 dark:text-slate-300">
          Browse subjects, practice with randomized quizzes, and track progress locally. Built for
          mobile, PWA install, and WebView-friendly deployment.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            completed={progress[subject.id]?.completedQuizzes ?? 0}
            bestScore={progress[subject.id]?.bestScore ?? 0}
          />
        ))}
      </section>
    </div>
  );
}
