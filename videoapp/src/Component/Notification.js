import React, { useContext } from 'react';
import { Button } from '@mui/material';

import { socketcontext } from '../SocketContext'

const Notifications = () => {
  const { answercall, call, callaccepted } = useContext(socketcontext);

  return (
    <>
    {/* {console.log(call.isRecieved,callaccepted)} */}
      { (!callaccepted && call.isRecieved) &&(
        
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answercall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;