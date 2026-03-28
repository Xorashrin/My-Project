import Link from 'next/link';

type QuizResultProps = {
  subjectId: string;
  score: number;
  total: number;
};

export function QuizResult({ subjectId, score, total }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <section className="glass rounded-xl p-6 text-center">
      <h2 className="text-2xl font-bold">Quiz Completed 🎉</h2>
      <p className="mt-2 text-lg">
        Score: <span className="font-semibold">{score}</span> / {total} ({percentage}%)
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <Link href={`/quiz/${subjectId}`} className="rounded-lg bg-brand-600 px-4 py-2 text-white">
          Retry Quiz
        </Link>
        <Link href={`/subject/${subjectId}`} className="rounded-lg border border-slate-400 px-4 py-2">
          Back to Subject
        </Link>
      </div>
    </section>
  );
}
