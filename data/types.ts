export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

export type SubjectData = {
  id: string;
  name: string;
  questions: Question[];
};
