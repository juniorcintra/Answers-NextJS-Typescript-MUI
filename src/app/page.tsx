'use client'

import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import MainTopBar from '../components/MainTopBar'
import BooksList from '@/components/BooksList'
import QuestionsList from '@/components/QuestionsList'

export default function Home() {
  const [tab, setTab] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MainTopBar />

      <Box
        sx={{
          mx: 'auto',
          marginTop: '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '41px',
          width: '90%',
          maxWidth: '1200px',
        }}
      >
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Questões" />
          <Tab label="Respostas" />
        </Tabs>

        {tab === 0 ? <BooksList /> : <QuestionsList />}
      </Box>
    </Box>
  )
}
