'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/data';

type QuestionCardProps = {
  question: Question;
  selected?: string;
  onSelect?: (answer: string) => void;
  readonly?: boolean;
  showResult?: boolean;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
};

export function QuestionCard({
  question,
  selected,
  onSelect,
  readonly = false,
  showResult = false,
  bookmarked,
  onToggleBookmark
}: QuestionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold">{question.question}</h3>
        {onToggleBookmark && (
          <button className="text-xl leading-none" onClick={onToggleBookmark} aria-label="bookmark">
            {bookmarked ? '🔖' : '📑'}
          </button>
        )}
      </div>
      <div className="mt-3 grid gap-2">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = question.answer === option;
          const isWrongSelection = showResult && isSelected && !isCorrect;

          return (
            <button
              key={option}
              onClick={() => onSelect?.(option)}
              disabled={readonly}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                showResult
                  ? isCorrect
                    ? 'border-emerald-400 bg-emerald-500/20'
                    : isWrongSelection
                      ? 'border-rose-400 bg-rose-500/20'
                      : 'border-slate-300 dark:border-slate-700'
                  : isSelected
                    ? 'border-brand-500 bg-brand-500/20'
                    : 'border-slate-300 hover:border-brand-400 dark:border-slate-700'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showResult && question.explanation && (
        <p className="mt-3 rounded-md bg-slate-900/10 p-2 text-xs dark:bg-slate-100/10">💡 {question.explanation}</p>
      )}
    </motion.article>
  );
}
