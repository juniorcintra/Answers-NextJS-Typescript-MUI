import { render, screen, fireEvent } from '@testing-library/react'
import { Book } from '../../types'
import CardBook from '../CardBook'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { NextRouter } from 'next/router'

jest.mock('../../store/slices', () => ({
  useGlobalStore: jest.fn().mockReturnValue({
    setBook: jest.fn(),
    setQuestion: jest.fn(),
  }),
}))

const mockPush = jest.fn()

const mockNextRouter: NextRouter = {
  push: mockPush,
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  isLocaleDomain: false,
}

jest.mock('next/navigation', () => ({
  useRouter: () => mockNextRouter,
}))

describe('CardBook', () => {
  const book: Book = {
    id: 1,
    title: 'Livro de Teste',
    duration: 0,
    questions: [
      { id: 1, title: 'Pergunta 1', description: '', duration: 0, idBook: 1, answer: '' },
      { id: 2, title: 'Pergunta 2', description: '', duration: 0, idBook: 1, answer: 'Resposta' },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve renderizar o título do livro corretamente', () => {
    render(
      <RouterContext.Provider value={mockNextRouter}>
        <CardBook book={book} />
      </RouterContext.Provider>,
    )
    expect(screen.getByText('Livro de Teste')).toBeInTheDocument()
  })

  test('deve exibir o status "Não respondido" com a cor correta quando houver perguntas não respondidas', () => {
    render(
      <RouterContext.Provider value={mockNextRouter}>
        <CardBook book={book} />
      </RouterContext.Provider>,
    )

    expect(screen.getByText('Não respondido')).toBeInTheDocument()
    const chip = screen.getByText('Não respondido').closest('div')
    expect(chip).toHaveStyle('background-color: rgba(255, 248, 228, 1)')
  })

  test('deve desabilitar o botão "Responder" se todas as questões estiverem respondidas', () => {
    const answeredBook: Book = {
      id: 1,
      title: 'Livro de Teste',
      duration: 0,
      questions: [
        { id: 1, title: 'Pergunta 1', description: '', duration: 0, idBook: 1, answer: 'asdfasdf' },
        { id: 2, title: 'Pergunta 2', description: '', duration: 0, idBook: 1, answer: 'Resposta' },
      ],
    }

    render(
      <RouterContext.Provider value={mockNextRouter}>
        <CardBook book={answeredBook} />
      </RouterContext.Provider>,
    )

    const button = screen.getByText('Responder')
    expect(button).toBeDisabled()
  })

  test('deve habilitar o botão "Responder" se houver perguntas não respondidas', () => {
    render(
      <RouterContext.Provider value={mockNextRouter}>
        <CardBook book={book} />
      </RouterContext.Provider>,
    )

    const button = screen.getByText('Responder')
    expect(button).toBeEnabled()
  })

  test('deve navegar para a página "/book" quando o botão "Responder" for clicado', () => {
    render(
      <RouterContext.Provider value={mockNextRouter}>
        <CardBook book={book} />
      </RouterContext.Provider>,
    )

    const button = screen.getByText('Responder')
    fireEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith('/book')
  })
})
