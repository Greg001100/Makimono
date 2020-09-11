import React from 'react';
import { Button } from 'react-bootstrap'

export default function DemoButton ({ email, setEmail, password, setPassword }) {

  let i=0, k=0, spd = 25;
  let txt = 'demo@makimono.com'
  let pwd = 'P4ssword'

  let handleClick = () => {
    setEmail('')
    setPassword('')
    email = ''
    password = ''
    typeEmail()
    setTimeout(typePassword, spd*txt.length)
  }

  function typeEmail() {
    if (i < txt.length) {
      setEmail(email += txt.charAt(i))
      i++
      setTimeout(typeEmail, spd);
    }
  }

  function typePassword() {
    if (k < pwd.length) {
      setPassword(password += pwd.charAt(k))
      k++;
      setTimeout(typePassword, spd);
    } else {
      document.querySelector('.signIn').click()
    }
  }



  return (
    <Button
    variant="primary"
    onClick={handleClick}
    >Demo Login</Button>
  )
}
