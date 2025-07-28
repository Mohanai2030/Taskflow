import dotenv from 'dotenv'
dotenv.config();
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);


export async function verifyGoogleToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID, // same as frontend client ID
  });

  const payload = ticket.getPayload();
  // console.log("id token successfully decoded",payload.email)

  // You can now create your own session or JWT using this info
  return {
    email: payload.email,
    name: payload.name,
    googleId: payload.sub,
  };
}


