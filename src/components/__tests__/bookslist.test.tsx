import { render, screen, fireEvent } from '@testing-library/react'
import BooksList from '../BooksList'
import { useGlobalStore } from '@/store/slices'

jest.mock('../CardBook', () => {
  return {
    __esModule: true,
    default: ({ book }: { book: { title: string } }) => <div data-testid="card-book">{book.title}</div>,
  }
})

jest.mock('@/store/slices', () => ({
  useGlobalStore: jest.fn(),
}))

describe('BooksList Component', () => {
  beforeEach(() => {
    ;(useGlobalStore as unknown as jest.Mock).mockReturnValue({
      books: [
        {
          id: 1,
          title: 'Book 1',
          questions: [{ question: 'Q1', answer: '' }],
        },
        {
          id: 2,
          title: 'Book 2',
          questions: [{ question: 'Q2', answer: 'Answer 2' }],
        },
      ],
    })
  })

  it('deve renderizar todos os livros por padrão', () => {
    render(<BooksList />)

    const bookCards = screen.getAllByTestId('card-book')
    console.log(bookCards)

    expect(bookCards).toHaveLength(2)
    expect(screen.getByText('Book 1')).toBeInTheDocument()
    expect(screen.getByText('Book 2')).toBeInTheDocument()
  })

  it('deve filtrar livros com questões não respondidas quando a checkbox for ativada', () => {
    render(<BooksList />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    const bookCards = screen.getAllByTestId('card-book')
    expect(bookCards).toHaveLength(1)
    expect(screen.getByText('Book 1')).toBeInTheDocument()
    expect(screen.queryByText('Book 2')).not.toBeInTheDocument()
  })

  it('deve exibir todos os livros novamente quando a checkbox for desativada', () => {
    render(<BooksList />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    fireEvent.click(checkbox)

    const bookCards = screen.getAllByTestId('card-book')
    expect(bookCards).toHaveLength(2)
    expect(screen.getByText('Book 1')).toBeInTheDocument()
    expect(screen.getByText('Book 2')).toBeInTheDocument()
  })
})
