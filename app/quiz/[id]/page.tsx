import { notFound } from 'next/navigation';
import { getSubjectById } from '@/lib/utils';
import { QuizPageClient } from '@/components/QuizPageClient';

export default function QuizPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { mode?: string };
}) {
  const subject = getSubjectById(params.id);

  if (!subject) {
    notFound();
  }

  return <QuizPageClient subject={subject} mode={searchParams.mode} />;
}
