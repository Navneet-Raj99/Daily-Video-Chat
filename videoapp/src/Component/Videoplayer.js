import React, { useContext } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { socketcontext } from '../SocketContext'
function Videoplayer() {
  const { call, callaccepted, videoReference, uservideoReference,
    stream, name,  callended} = useContext(socketcontext)
  return (

    <Grid container style={{ justifyContent: 'center' }}>
      {stream && (
        <Paper style={{ padding: '10px', border: '2px solid black', margin: "10px" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || "Name"}</Typography>
            <div >
              <video autoPlay style={{ width: '550px' }} ref={videoReference} />
            </div>
          </Grid>
        </Paper>
      )}
      {
        callaccepted && !callended &&
        (
          <Paper style={{ padding: '10px', border: '2px solid black', margin: "10px", }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{call.name || "Name"}</Typography>
              <video playsInline muted autoPlay style={{ width: '550px' }} ref={uservideoReference} />
            </Grid>
          </Paper>
        )
      }
    </Grid>
  )
}

export default Videoplayer