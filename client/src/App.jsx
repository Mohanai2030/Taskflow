
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import {Login} from './components/login'
// import {GoogleOauthProvider} from '@react-oauth/google'


function App() {
  return (
      <GoogleOAuthProvider clientId="228742030444-tiana66mu179uelg3hctqslljmkilito.apps.googleusercontent.com">
        <Login/>
      </GoogleOAuthProvider>    
  )
}

export default App
