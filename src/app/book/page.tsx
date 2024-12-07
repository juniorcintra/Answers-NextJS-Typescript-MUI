'use client'

import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import iconPNG from '@/assets/icon.png'
import LogoFinal from '@/assets/logoFinal.png'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useGlobalStore } from '@/store/slices'
import { useRouter } from 'next/navigation'

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '838px',
  height: '552px',
  bgcolor: '#fff',
  borderRadius: '50px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px',
}

export default function BookPage() {
  const { book, question, setQuestion, setBook, setBooks, books } = useGlobalStore()

  const router = useRouter()

  const [seconds, setSeconds] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState(question?.answer ?? '')
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const isFirstQuestion = currentIndex === 0

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds])

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

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

    if (book?.questions && currentIndex === book?.questions?.length - 1) {
      setOpen(true)
    }
  }

  const renderTime = (): string => {
    const hours = Math.floor((book?.duration ?? 0) / 3600)
    const minutes = Math.floor(((book?.duration ?? 0) % 3600) / 60)
    const seconds = (book?.duration ?? 0) % 60

    if (hours > 0) {
      return `${hours} hr ${minutes} min ${seconds} seg de prova`
    } else if (minutes > 0) {
      return `${minutes} min ${seconds} seg de prova`
    } else {
      return `${seconds} seg de prova`
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          boxShadow: '0px -1px 0px 0px rgba(223, 229, 241, 1) inset',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          py: '28px',
          maxWidth: '1235px',
          width: '90%',
          mx: 'auto',
        }}
      >
        <Image src={iconPNG} alt="icon" />
        <Typography sx={{ color: 'rgba(17, 11, 62, 1)' }}>Estudologia</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '72px',
          py: '32px',
          maxWidth: '1235px',
          width: '90%',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Button variant="text" onClick={() => router.back()}>
            <ArrowBackIcon />
            Home
          </Button>
          <Typography
            sx={{ color: 'rgba(17, 11, 62, 1)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <EditOutlinedIcon />
            {book?.title}
          </Typography>

          <Box
            sx={{
              borderWidth: 1,
              borderColor: 'rgba(125, 141, 166, 1)',
              borderRadius: '10px',
              borderStyle: 'solid',
              width: '138px',
              height: '44px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <AccessTimeIcon />
            {formatTime(seconds)}
          </Box>
        </Box>

        {question && (
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
            >
              {question?.title} {currentIndex + 1}/{book?.questions?.length}
            </Typography>

            <Typography
              sx={{ color: 'rgba(17, 11, 62, 1)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
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
              disabled={answer === ''}
              onClick={updateCurrentQuestion}
            >
              Enviar Resposta
            </Button>

            <Divider
              sx={{ backgroundColor: 'rgba(243, 243, 243, 1)', height: '1px', width: '100%' }}
              aria-hidden="true"
            />

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
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Image src={LogoFinal} alt="logoFinal" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Typography sx={{ fontSize: '30px', color: '#502DB3', fontWeight: 'bold' }}>
              Agradecemos a sua participação!
            </Typography>
            <Typography sx={{ fontSize: '20px', color: '#7D8DA6' }}>Respostas enviadas com sucesso</Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '20px',
              color: '#7D8DA6',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <AccessTimeIcon />
            {renderTime()}
          </Typography>
          <Button
            sx={{ borderRadius: '36px', width: '216px', color: '#442B8C', borderColor: '#442B8C' }}
            variant="outlined"
            size="large"
            onClick={() => router.back()}
          >
            Valeu!
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}
