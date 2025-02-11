import React from 'react'

function TestLogin() {


    const login = () => {
            window.location.href = "https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/auth/google/redirect";
    }
  return (
      <div className="" >
          <div className="">gagddfsfs</div>
          
          <div className="" onClick={login}>testlogin</div>
          
         </div>
  )
}

export default TestLogin