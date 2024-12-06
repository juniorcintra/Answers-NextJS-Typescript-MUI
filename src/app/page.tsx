'use client'

import { useState } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Tab, Tabs } from '@mui/material'
import MainTopBar from '../components/mainTopBar'
import BasicCard from '../components/cardQuestions'
import { useGlobalStore } from '../store/slices'

export default function Home() {
  const [value, setValue] = useState(0)
  const [checked, setChecked] = useState(false)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { books } = useGlobalStore()

  return (
    <Box className="flex h-screen flex-col">
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Questões" />
          <Tab label="Respostas" />
        </Tabs>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '21px',
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Mostrar apenas questões não respondidas"
              onChange={() => setChecked(!checked)}
              checked={checked}
            />
          </FormGroup>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: '33px',
              flexWrap: 'wrap',
            }}
          >
            {books
              .filter((book) => {
                if (checked) {
                  if (book.questions.find((question) => question.answer === '')) {
                    return true
                  }
                  return false
                }
                return true
              })
              .map((book) => {
                return <BasicCard key={book.id} book={book} />
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
