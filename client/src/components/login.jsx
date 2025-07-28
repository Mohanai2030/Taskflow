import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';

export function Login(){
  async function handleGoogleLoginSuccess(credentialResponse){
    const idToken = credentialResponse.credential;
    try{
      const loginData = await axios.post('/api/auth/login',{idToken},{
        withCredentials:true
      });
      console.log(loginData);
    }
    catch(err){
      console.log("Error when trying to log in",err)
    }
  }

  function handleGoogleLoginError(){
    console.error("google login failed")
  }
  return(
    <div>
      <h1>Login with Google account</h1>
      <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError}/>
    </div>
  )
}