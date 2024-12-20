import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGlobalStore } from '@/store/slices'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

export default function QuestionsList() {
  const [tab, setTab] = useState(1)

  const { books, book, setBook } = useGlobalStore()

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
    setBook(books.filter((book) => book.id === newValue)[0])
  }

  useEffect(() => {
    setBook(books.filter((book) => book.id === 1)[0])
  }, [books, setBook])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '21px',
        width: '100%',
      }}
    >
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          '& .Mui-selected': { color: '#542DC0 !important' },
          '& .MuiTabs-indicator': { backgroundColor: '#542DC0' },
        }}
      >
        {books.map((book) => {
          return (
            <Tab
              key={book.id}
              value={book.id}
              sx={{ fontWeight: 'bold' }}
              label={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                  <EditOutlinedIcon />
                  Caderno de questões {book.id}
                </Box>
              }
            />
          )
        })}
      </Tabs>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          width: '100%',
        }}
      >
        {book?.questions?.map((question, index) => {
          return (
            <Box
              key={question.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <Typography
                sx={{ color: '#000', fontWeight: 'bold', fontSize: '16px', lineHeight: '19px', width: '100%' }}
              >
                {question.description} - 0{index + 1}
              </Typography>
              <Typography
                sx={{ color: '#7D8DA6', fontWeight: '400', fontSize: '13px', lineHeight: '15px', width: '100%' }}
              >
                Resposta:{' '}
              </Typography>
              <Typography
                sx={{
                  color: '#7D8DA6',
                  fontWeight: '400',
                  fontSize: '13px',
                  lineHeight: '15px',
                  width: '100%',
                  textOverflow: 'ellipsis',
                }}
              >
                {question.answer !== '' ? question.answer : 'Não respondida'}
              </Typography>
              {book?.questions && index !== book?.questions?.length - 1 && (
                <Divider
                  sx={{ backgroundColor: 'rgba(243, 243, 243, 1)', height: '1px', width: '100%' }}
                  aria-hidden="true"
                />
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
