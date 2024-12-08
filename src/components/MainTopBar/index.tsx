import React from 'react'

import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import InsertCommentIcon from '@mui/icons-material/InsertCommentOutlined'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import { Badge, Box, Typography } from '@mui/material'

export default function MainTopBar() {
  return (
    <Box
      sx={{
        boxShadow: '0px -1px 0px 0px rgba(223, 229, 241, 1) inset',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '38px',
        px: '66px',
        py: '28px',
      }}
    >
      <Badge color="secondary" variant="dot">
        <NotificationsIcon sx={{ color: 'rgba(165, 180, 203, 1)', cursor: 'pointer' }} />
      </Badge>

      <InsertCommentIcon sx={{ color: 'rgba(165, 180, 203, 1)', cursor: 'pointer' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
        <SearchIcon sx={{ color: 'rgba(165, 180, 203, 1)' }} />
        <Typography sx={{ color: 'rgba(165, 180, 203, 1)' }}>Procurar</Typography>
      </Box>
    </Box>
  )
}
