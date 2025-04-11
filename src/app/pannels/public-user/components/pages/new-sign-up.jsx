import React from 'react'
import NewAuthForm from './new-auth-form'

const NewSignUp = ({ onAuthToggle }) => {
    return (
      <NewAuthForm currentState="signUp" onAuthToggle={onAuthToggle} />
    );
  };

export default NewSignUp