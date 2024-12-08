import { render, screen, fireEvent } from '@testing-library/react'
import QuestionsForm from '../QuestionsForm'
import { useGlobalStore } from '@/store/slices'

jest.mock('@/store/slices', () => ({
  useGlobalStore: jest.fn(),
}))

const mockSetSeconds = jest.fn()
const mockSetOpen = jest.fn()
const mockSetQuestion = jest.fn()
const mockSetBook = jest.fn()
const mockSetBooks = jest.fn()

describe('QuestionsForm', () => {
  const book = {
    questions: [
      { id: 1, title: 'Question 1', description: 'This is question 1', answer: '' },
      { id: 2, title: 'Question 2', description: 'This is question 2', answer: '' },
    ],
  }

  const question = book.questions[0]

  beforeEach(() => {
    ;(useGlobalStore as unknown as jest.Mock).mockImplementation(() => ({
      book,
      question,
      setQuestion: mockSetQuestion,
      setBook: mockSetBook,
      setBooks: mockSetBooks,
      books: [book],
    }))

    mockSetSeconds.mockClear()
    mockSetOpen.mockClear()
    mockSetQuestion.mockClear()
    mockSetBook.mockClear()
    mockSetBooks.mockClear()
  })

  test('deve renderizar a primeira questão corretamente', () => {
    render(<QuestionsForm seconds={0} setSeconds={mockSetSeconds} setOpen={mockSetOpen} />)

    expect(screen.getByText((content) => content.startsWith('Question 1'))).toBeInTheDocument()
  })

  test('deve navegar para a próxima questão ao clicar em "Próxima"', () => {
    render(<QuestionsForm seconds={0} setSeconds={mockSetSeconds} setOpen={mockSetOpen} />)

    const nextButton = screen.getByText('Próxima')
    fireEvent.click(nextButton)

    expect(mockSetQuestion).toHaveBeenCalledWith(book.questions[1])
    expect(mockSetSeconds).toHaveBeenCalledWith(0)
  })

  test('deve navegar para a questão anterior ao clicar em "Anterior"', () => {
    render(<QuestionsForm seconds={0} setSeconds={mockSetSeconds} setOpen={mockSetOpen} />)

    const nextButton = screen.getByText('Próxima')
    fireEvent.click(nextButton)

    const prevButton = screen.getByText('Anterior')
    fireEvent.click(prevButton)

    expect(mockSetQuestion).toHaveBeenCalledWith(book.questions[0])
    expect(mockSetSeconds).toHaveBeenCalledWith(0)
  })

  test('deve habilitar o botão "Enviar Resposta" quando uma resposta for digitada', () => {
    render(<QuestionsForm seconds={0} setSeconds={mockSetSeconds} setOpen={mockSetOpen} />)

    const input = screen.getByPlaceholderText('Escreva sua resposta aqui') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Nova resposta' } })

    const submitButton = screen.getByText('Enviar Resposta') as HTMLButtonElement
    expect(submitButton).not.toBeDisabled()
  })

  test('deve chamar updateCurrentQuestion quando a resposta for enviada', () => {
    render(<QuestionsForm seconds={10} setSeconds={mockSetSeconds} setOpen={mockSetOpen} />)

    const input = screen.getByPlaceholderText('Escreva sua resposta aqui') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Nova resposta' } })

    const submitButton = screen.getByText('Enviar Resposta') as HTMLButtonElement
    fireEvent.click(submitButton)

    expect(mockSetBook).toHaveBeenCalled()
    expect(mockSetBooks).toHaveBeenCalled()
  })
})
