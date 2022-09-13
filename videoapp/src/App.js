import './App.css';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Videoplayer from './Component/Videoplayer';
import Sidebar from './Component/Sidebar';
import Notification from './Component/Notification';
function App() {
  return (
    <div className="App">
      {/* <h1> Hello video meet app</h1> */}
      <AppBar position='static' color="inherit">
        <Typography variant='h2' align="center">
          VideoChat
        </Typography>
      </AppBar>
      <Videoplayer/>
      <Sidebar>
        <Notification/>
      </Sidebar>
    </div>
  );
}

export default App;
