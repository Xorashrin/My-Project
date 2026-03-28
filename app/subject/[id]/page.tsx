import { notFound } from 'next/navigation';
import { getSubjectById } from '@/lib/utils';
import { SubjectPageClient } from '@/components/SubjectPageClient';

export default function SubjectPage({ params }: { params: { id: string } }) {
  const subject = getSubjectById(params.id);

  if (!subject) {
    notFound();
  }

  return <SubjectPageClient subject={subject} />;
}
