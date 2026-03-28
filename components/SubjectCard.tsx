'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { SubjectData } from '@/data';

type SubjectCardProps = {
  subject: SubjectData;
  completed: number;
  bestScore: number;
};

export function SubjectCard({ subject, completed, bestScore }: SubjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass rounded-xl p-5"
    >
      <h2 className="text-lg font-semibold">{subject.name}</h2>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
        {subject.questions.length} questions available
      </p>
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
        Completed quizzes: {completed} • Best score: {bestScore}/{subject.questions.length}
      </p>
      <Link
        href={`/subject/${subject.id}`}
        className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
      >
        Open Subject
      </Link>
    </motion.article>
  );
}
