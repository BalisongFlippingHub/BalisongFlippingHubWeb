import './App.css'
import { AuthContextProvider } from './contexts/useAuthContext'
import { AppRouter } from './routes/AppRouter'

const App = () => {

  return (
    <>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </>
  )
}

export default App
