import React from 'react'
import NewAuthForm from './new-auth-form'

const NewSignIn = ({ onAuthToggle }) => {
    return (
      <NewAuthForm currentState="signIn" onAuthToggle={onAuthToggle} />
    );
  };
  
export default NewSignIn