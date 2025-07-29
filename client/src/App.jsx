
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import {Login} from './components/login'
import KanbanBoard from './components/kanbanboard'
// import {GoogleOauthProvider} from '@react-oauth/google'


function App() {
  return (
      <GoogleOAuthProvider clientId="228742030444-tiana66mu179uelg3hctqslljmkilito.apps.googleusercontent.com">
        <KanbanBoard/>
      </GoogleOAuthProvider>    
  )
}

export default App
