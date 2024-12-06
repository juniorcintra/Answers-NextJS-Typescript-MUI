'use client'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import iconPNG from '@/assets/icon.png'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useGlobalStore } from '@/store/slices'

export default function BookPage() {
  const { book, question } = useGlobalStore()

  const [seconds, setSeconds] = useState(0)

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
          justifyContent: 'center',
          gap: '72px',
          py: '32px',
          maxWidth: '1235px',
          width: '90%',
          mx: 'auto',
          position: 'relative',
        }}
      >
        <Typography sx={{ color: 'rgba(17, 11, 62, 1)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <EditOutlinedIcon />
          {book?.title}
        </Typography>

        <Box
          sx={{
            position: 'absolute',
            right: '10px',
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

        {question && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: '15px',
              width: '100%',
            }}
          >
            <Typography
              sx={{ color: 'rgba(17, 11, 62, 1)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <EditOutlinedIcon />
              {book?.title}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
