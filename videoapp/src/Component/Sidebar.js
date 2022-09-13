
import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Assignment from '@mui/icons-material/Assignment';
import PhoneDisabled from '@mui/icons-material/PhoneDisabled';
import Phone from '@mui/icons-material/Phone';

import { socketcontext } from '../SocketContext'


const Sidebar = ({ children }) => {
  const { me, callaccepted, name, setname, callended, leavecall, calluser} = useContext(socketcontext);
  const [idToCall, setIdToCall] = useState("");


  return (
    <Container >
      <Paper elevation={10}>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12} md={6} >
              <Typography gutterBottom variant="h6">UserInfo</Typography>
              <TextField label="Name" value={name} onChange={(e) => setname(e.target.value)} fullWidth />
              <CopyToClipboard text={me}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callaccepted && !callended ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leavecall}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => calluser(idToCall)}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};
export default Sidebar;