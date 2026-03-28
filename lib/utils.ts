import { subjects } from '@/data';
import type { Question, SubjectData } from '@/data';

export const getSubjects = (): SubjectData[] => subjects;

export const getSubjectById = (id: string): SubjectData | undefined =>
  subjects.find((subject) => subject.id === id);

export const shuffleArray = <T,>(array: T[]): T[] => {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

export const buildQuizQuestions = (questions: Question[], examModeCount?: number): Question[] => {
  const shuffled = shuffleArray(questions);
  if (!examModeCount || examModeCount <= 0 || examModeCount >= shuffled.length) {
    return shuffled;
  }
  return shuffled.slice(0, examModeCount);
};

export const normalizeText = (text: string): string => text.toLowerCase().trim();
