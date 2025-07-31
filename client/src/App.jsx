
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import {Login} from './components/login'
import KanbanBoard from './components/kanbanboard'
import {Routes,Route} from 'react-router-dom'
import { Signup } from './components/signup'
import { Profile } from './components/profile'
import { Notfound } from './components/notfound'
// import {GoogleOauthProvider} from '@react-oauth/google'


function App() {
  return (
    <GoogleOAuthProvider clientId="228742030444-tiana66mu179uelg3hctqslljmkilito.apps.googleusercontent.com">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/kanban' element={<KanbanBoard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
