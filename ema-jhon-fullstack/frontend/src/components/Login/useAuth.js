import React,{ useState,createContext, useContext, useEffect } from "react";
import { Route,Redirect } from "react-router-dom";

// firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

// firebase initial call
firebase.initializeApp(firebaseConfig);

// create Context & provider
const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const auth = Auth();
  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);


// privateRoute
export const PrivateRoute = ({children,...rest}) => {
  const auth = useAuth();
  return(
    <Route
      {...rest}
      render = {({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

// Auth function
const Auth = () => {
  // user state inital
  const [user,setUser] = useState(null);

  const signInGoogle = () => {
    // for google popup
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
            .then(res=>{
              const {displayName,email,photoURL} = res.user;
              // new signin user
              const signedInUser = {
                name: displayName,
                email:email,
                photo:photoURL
              }
              //user setup
              setUser(signedInUser);

              return res.user;
            })
            .catch(error => {
              setUser(null);
              console.log(error)
            });
  }

  const signOutGoogle = () => {
    return firebase.auth().signOut()
    .then( () => {
      setUser(null);
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  }

  useEffect( () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in
        const {displayName,email,photoURL} = user;
        // new signin user
        const currentUser = {
          name: displayName,
          email:email,
          photo:photoURL
        }
        setUser(currentUser);
      } else {
        // No user is signed in
      }
    });

  },[]);

  return {
    user,
    signInGoogle,
    signOutGoogle
  }
}

export default Auth;