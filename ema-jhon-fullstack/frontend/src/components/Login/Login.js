import React from 'react';
import Auth from './useAuth';

const Login = () => {

  const auth = Auth();

  const handleSignIn = () => {
    auth.signInGoogle()
    .then(res=> {
      window.location.pathname = '/review';
    })
  }

  const handleSignOut = () => {
    auth.signOutGoogle()
    .then(res=> {
      window.location.pathname = '/shop';
    })
  }

  return (
    <div>
      {
        auth.user ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign in Google</button>
      }
    </div>
  );
};

export default Login;