import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import CardBook from '../CardBook'
import { useGlobalStore } from '@/store/slices'

export default function BooksList() {
  const [checked, setChecked] = useState(false)

  const { books } = useGlobalStore()

  return (
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
          sx={{ color: '#141736' }}
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
              if (book?.questions?.find((question) => question.answer === '')) {
                return true
              }
              return false
            }
            return true
          })
          .map((book) => {
            return <CardBook key={book.id} book={book} />
          })}
      </Box>
    </Box>
  )
}
