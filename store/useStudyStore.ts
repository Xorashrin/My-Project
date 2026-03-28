'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Question } from '@/data';

type QuizSession = {
  subjectId: string;
  questions: Question[];
  selectedAnswers: Record<string, string>;
  startedAt: number;
  durationSeconds?: number;
};

type SubjectProgress = {
  completedQuizzes: number;
  bestScore: number;
  lastScore: number;
};

type StudyState = {
  darkMode: boolean;
  quizSession?: QuizSession;
  progress: Record<string, SubjectProgress>;
  bookmarks: Record<string, string[]>;
  setDarkMode: (value: boolean) => void;
  resetProgress: () => void;
  startQuiz: (subjectId: string, questions: Question[], durationSeconds?: number) => void;
  setAnswer: (questionId: string, answer: string) => void;
  finishQuiz: () => { score: number; total: number } | null;
  clearQuiz: () => void;
  toggleBookmark: (subjectId: string, questionId: string) => void;
};

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      progress: {},
      bookmarks: {},
      setDarkMode: (value) => set({ darkMode: value }),
      resetProgress: () => set({ progress: {}, bookmarks: {} }),
      startQuiz: (subjectId, questions, durationSeconds) =>
        set({
          quizSession: {
            subjectId,
            questions,
            selectedAnswers: {},
            startedAt: Date.now(),
            durationSeconds
          }
        }),
      setAnswer: (questionId, answer) => {
        const quizSession = get().quizSession;
        if (!quizSession) return;

        set({
          quizSession: {
            ...quizSession,
            selectedAnswers: {
              ...quizSession.selectedAnswers,
              [questionId]: answer
            }
          }
        });
      },
      finishQuiz: () => {
        const quizSession = get().quizSession;
        if (!quizSession) return null;

        const score = quizSession.questions.reduce((acc, q) => {
          return quizSession.selectedAnswers[q.id] === q.answer ? acc + 1 : acc;
        }, 0);

        const currentProgress = get().progress[quizSession.subjectId] ?? {
          completedQuizzes: 0,
          bestScore: 0,
          lastScore: 0
        };

        const total = quizSession.questions.length;

        set((state) => ({
          progress: {
            ...state.progress,
            [quizSession.subjectId]: {
              completedQuizzes: currentProgress.completedQuizzes + 1,
              bestScore: Math.max(currentProgress.bestScore, score),
              lastScore: score
            }
          }
        }));

        return { score, total };
      },
      clearQuiz: () => set({ quizSession: undefined }),
      toggleBookmark: (subjectId, questionId) => {
        const list = get().bookmarks[subjectId] ?? [];
        const exists = list.includes(questionId);
        const next = exists ? list.filter((item) => item !== questionId) : [...list, questionId];

        set((state) => ({
          bookmarks: {
            ...state.bookmarks,
            [subjectId]: next
          }
        }));
      }
    }),
    {
      name: 'study-sprint-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        darkMode: state.darkMode,
        progress: state.progress,
        bookmarks: state.bookmarks
      })
    }
  )
);
