export type Book = {
  id: number;
  title: string;
  duration: number;
  questions: Question[];
};

export type Question = {
  id: number;
  idBook: number;
  title: string;
  description: string;
  answer: string;
  duration: number;
};
