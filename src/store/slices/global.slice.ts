// stores/globalStore.ts

import { Book, Question } from '@/types'
import { books } from '@/utils/constants'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type GlobalState = {
  books: Book[]
  book: Book | null
  question?: Question
  setBook: (data: Book) => void
  setBooks: (data: Book[]) => void
  setQuestion: (data: Question) => void
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      books: books,
      book: null,
      question: undefined,
      setBook: (data) =>
        set({
          book: data,
        }),
      setBooks: (data) =>
        set({
          books: data,
        }),
      setQuestion: (data) =>
        set({
          question: data,
        }),
    }),
    {
      name: 'answers',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useGlobalStore
