import React from 'react'
import {useContextProvider,} from '../SocketContext'
import ReactPlayer from 'react-player'
import { Stack,Paper } from '@mui/material'

const Video = () => {
  const {localStream,remoteStream,UserConnected,} = useContextProvider()
  return (
    <Stack direction='row' sx={{height:'80%',width:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
      <ReactPlayer url={localStream} playing/>
      {UserConnected&&
        <ReactPlayer url={remoteStream} playing/>
      }
    </Stack>
  )
}

export default Video
