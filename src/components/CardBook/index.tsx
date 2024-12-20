import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, Chip } from '@mui/material'
import { Book } from '../../types'
import { useGlobalStore } from '../../store/slices'
import { useRouter } from 'next/navigation'

interface CardBookProps {
  book: Book
}

export default function CardBook({ book }: CardBookProps) {
  const router = useRouter()

  const handleGetStatus = () => {
    if (book?.questions?.find((question) => question.answer === '')) {
      return true
    }
    return false
  }

  const { setBook, setQuestion } = useGlobalStore()

  const handleNavigate = () => {
    if (book?.questions) {
      setBook(book)
      setQuestion(book?.questions[0])
      router.push('/book')
    }
  }

  return (
    <Card
      sx={{
        borderRadius: '20px',
        borderWidth: 1,
        padding: '30px',
        gap: '15px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
      }}
    >
      <EditOutlinedIcon />
      <Box sx={{ gap: '5px', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {book.title}
        </Typography>
        <Chip
          label={!handleGetStatus() ? 'Respondido' : 'Não respondido'}
          color={!handleGetStatus() ? 'success' : 'warning'}
          sx={{
            width: 'min-content',
            backgroundColor: !handleGetStatus() ? 'rgba(225, 245, 213, 1)' : 'rgba(255, 248, 228, 1)',
            color: !handleGetStatus() ? 'rgba(33, 150, 83, 1)' : 'rgba(233, 154, 0, 1)',
            fontWeight: 'bold',
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ color: '#7D8DA6' }}>
        {book?.questions?.length} questões
      </Typography>
      <Button
        sx={{
          width: '100%',
          borderRadius: '36px',
          backgroundColor: '#542DC0',
          textTransform: 'initial',
          fontWeight: 'bold',
        }}
        variant="contained"
        size="large"
        disabled={!handleGetStatus()}
        onClick={handleNavigate}
      >
        Responder
      </Button>
    </Card>
  )
}
