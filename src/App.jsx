import CustomerList from './components/CustomerList'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

function App() {

  return (
    <Container maxWidth="xl"> 
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Customer Training
          </Typography>
        </Toolbar>
      </AppBar>
    <CustomerList />
    <CssBaseline />
    </Container>
  )
}

export default App