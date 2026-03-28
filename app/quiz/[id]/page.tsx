'use client';

import { useEffect, useMemo, useState } from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { QuestionCard } from '@/components/QuestionCard';
import { QuizResult } from '@/components/QuizResult';
import { getSubjectById, buildQuizQuestions } from '@/lib/utils';
import { useStudyStore } from '@/store/useStudyStore';
import type { Question } from '@/data';

const EXAM_LENGTH = 3;
const EXAM_DURATION = 60 * 3;

export default function QuizPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const subject = getSubjectById(params.id);
  const mode = searchParams.get('mode');
  const isExam = mode === 'exam';

  const quizSession = useStudyStore((state) => state.quizSession);
  const startQuiz = useStudyStore((state) => state.startQuiz);
  const setAnswer = useStudyStore((state) => state.setAnswer);
  const finishQuiz = useStudyStore((state) => state.finishQuiz);
  const clearQuiz = useStudyStore((state) => state.clearQuiz);

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
  const [reviewAnswers, setReviewAnswers] = useState<Record<string, string>>({});

  if (!subject) {
    notFound();
  }

  const shouldInitialize = !quizSession || quizSession.subjectId !== subject.id;

  useEffect(() => {
    if (shouldInitialize) {
      const questions = buildQuizQuestions(subject.questions, isExam ? EXAM_LENGTH : undefined);
      const duration = isExam ? EXAM_DURATION : undefined;
      startQuiz(subject.id, questions, duration);
      setSubmitted(false);
      setResult(null);
      setReviewQuestions([]);
      setReviewAnswers({});
    }
  }, [isExam, shouldInitialize, startQuiz, subject.id, subject.questions]);

  useEffect(() => {
    if (!quizSession?.durationSeconds || submitted) {
      setTimeLeft(null);
      return;
    }

    const tick = () => {
      const elapsed = Math.floor((Date.now() - quizSession.startedAt) / 1000);
      const remaining = Math.max(quizSession.durationSeconds! - elapsed, 0);
      setTimeLeft(remaining);
      if (remaining === 0) {
        const finalResult = finishQuiz();
        if (finalResult) {
          setReviewQuestions(quizSession.questions);
          setReviewAnswers(quizSession.selectedAnswers);
          setResult(finalResult);
          setSubmitted(true);
          clearQuiz();
        }
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [quizSession, submitted, finishQuiz, clearQuiz]);

  const questions = quizSession?.subjectId === subject.id ? quizSession.questions : [];

  const answeredCount = useMemo(() => {
    if (!quizSession) return 0;
    return Object.keys(quizSession.selectedAnswers).length;
  }, [quizSession]);

  const onSubmitQuiz = () => {
    if (!quizSession) return;

    const finalResult = finishQuiz();
    if (finalResult) {
      setReviewQuestions(quizSession.questions);
      setReviewAnswers(quizSession.selectedAnswers);
      setResult(finalResult);
      setSubmitted(true);
      clearQuiz();
    }
  };

  if (submitted && result) {
    return (
      <div className="space-y-4">
        <QuizResult subjectId={subject.id} score={result.score} total={result.total} />
        <section className="grid gap-3">
          {reviewQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              selected={reviewAnswers[question.id]}
              readonly
              showResult
            />
          ))}
        </section>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <section className="glass rounded-xl p-5">
        <h1 className="text-2xl font-bold">{subject.name} Quiz</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Answered {answeredCount}/{questions.length}
        </p>
        {isExam && typeof timeLeft === 'number' && (
          <p className="mt-2 inline-block rounded-md bg-amber-500/20 px-2 py-1 text-sm font-medium">
            ⏳ Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </p>
        )}
      </section>

      <section className="grid gap-3">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selected={quizSession?.selectedAnswers[question.id]}
            onSelect={(answer) => setAnswer(question.id, answer)}
          />
        ))}
      </section>

      <button
        className="w-full rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={questions.length === 0}
        onClick={onSubmitQuiz}
      >
        Submit Quiz
      </button>
    </motion.div>
  );
}
