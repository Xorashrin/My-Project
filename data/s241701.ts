import type { SubjectData } from './types';

const s241701: SubjectData = {
  id: 's241701',
  name: 'Computer Fundamentals',
  questions: [
    {
      id: 'cf-1',
      question: 'Which component executes instructions in a computer?',
      options: ['RAM', 'CPU', 'SSD', 'GPU'],
      answer: 'CPU',
      explanation: 'The Central Processing Unit (CPU) executes instructions from software.'
    },
    {
      id: 'cf-2',
      question: 'What does HTTP stand for?',
      options: [
        'HyperText Transfer Protocol',
        'Host Transfer Text Process',
        'Hyper Terminal Trace Program',
        'High Text Transfer Product'
      ],
      answer: 'HyperText Transfer Protocol'
    },
    {
      id: 'cf-3',
      question: 'Which memory is volatile?',
      options: ['ROM', 'SSD', 'RAM', 'HDD'],
      answer: 'RAM'
    },
    {
      id: 'cf-4',
      question: 'Which one is an operating system?',
      options: ['Chrome', 'Linux', 'Intel', 'Python'],
      answer: 'Linux'
    }
  ]
};

export default s241701;
