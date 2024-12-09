import { useGlobalStore } from '@/store/slices'
import { Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface QuestionFormProps {
  seconds: number
  setSeconds: (value: number) => void
  setOpen: (value: boolean) => void
}

export default function QuestionsForm({ seconds, setSeconds, setOpen }: QuestionFormProps) {
  const { book, question, setQuestion, setBook, setBooks, books } = useGlobalStore()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState(question?.answer ?? '')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const isFirstQuestion = currentIndex === 0

  const nextQuestion = () => {
    if (book?.questions && currentIndex < book?.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setQuestion(book?.questions[currentIndex + 1])
      setSeconds(0)
      setAnswer('')
    }
  }

  const prevQuestion = () => {
    if (book?.questions && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setQuestion(book?.questions[currentIndex - 1])
      setSeconds(0)
      setAnswer('')
    }
  }

  const handleChangeAnswer = (value: string) => {
    if (value.length <= 300) {
      setAnswer(value)
    }
  }

  const updateCurrentQuestion = () => {
    setLoading(true)
    const updatedQuestion = {
      ...question!,
      duration: seconds,
      answer,
    }

    const updatedBook = {
      ...book!,
      questions: book?.questions?.map((question) => (question.id === updatedQuestion.id ? updatedQuestion : question)),
      duration:
        book?.questions?.reduce(
          (total, question) =>
            total + (question?.id === updatedQuestion?.id ? updatedQuestion?.duration : question?.duration),
          0,
        ) || 0,
    }

    const updatedBooks = books.map((book) => (book.id === updatedBook.id ? updatedBook : book))

    setBook(updatedBook)
    setBooks(updatedBooks)

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)

    if (book?.questions && currentIndex === book?.questions?.length - 1) {
      setOpen(true)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '15px',
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
      }}
    >
      <Typography
        sx={{
          color: 'rgba(125, 141, 166, 1)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
        data-testid="question-title"
      >
        {question?.title} {currentIndex + 1}/{book?.questions?.length}
      </Typography>

      <Typography sx={{ color: 'rgba(17, 11, 62, 1)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {question?.description}
      </Typography>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={6}
          value={answer}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeAnswer(event.target.value)
          }}
          placeholder="Escreva sua resposta aqui"
          variant="filled"
        />
        <Typography sx={{ position: 'absolute', top: '5px', right: '10px' }}>{answer.length}/300</Typography>
      </Box>

      <Button
        sx={{ borderRadius: '36px' }}
        variant="contained"
        size="large"
        color={success ? 'success' : 'primary'}
        disabled={answer === ''}
        onClick={updateCurrentQuestion}
      >
        {loading ? <CircularProgress color="inherit" size={26} /> : success ? 'Editar Resposta' : 'Enviar Resposta'}
      </Button>

      <Divider sx={{ backgroundColor: 'rgba(243, 243, 243, 1)', height: '1px', width: '100%' }} aria-hidden="true" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Button variant="text" onClick={prevQuestion} disabled={isFirstQuestion}>
          <ArrowBackIcon />
          Anterior
        </Button>
        <Button
          variant="text"
          onClick={nextQuestion}
          disabled={book?.questions && currentIndex === book?.questions?.length - 1}
          style={{ marginLeft: '10px' }}
        >
          Próxima
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  )
}
