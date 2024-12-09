import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
    id: 1,
    questions: [
      { id: 1, title: 'Question 1', description: 'This is question 1', answer: '', duration: 0 },
      { id: 2, title: 'Question 2', description: 'This is question 2', answer: '', duration: 0 },
    ],
    duration: 0,
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

    expect(screen.getByTestId('question-title')).toHaveTextContent('Question 1 1/2')
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

  test('deve exibir o estado de carregamento ao enviar a resposta', async () => {
    render(<QuestionsForm seconds={10} setSeconds={mockSetSeconds} setOpen={mockSetOpen} />)

    const input = screen.getByPlaceholderText('Escreva sua resposta aqui') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Nova resposta' } })

    const submitButton = screen.getByRole('button', { name: /enviar resposta/i })
    fireEvent.click(submitButton)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /editar resposta/i })).toBeInTheDocument()
    })

    expect(mockSetBook).toHaveBeenCalled()
    expect(mockSetBooks).toHaveBeenCalled()
  })
})
