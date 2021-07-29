import React, { useState } from 'react'

function Forms() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)

  const btnDisabled = () => {
    const five = 5
    if (/^\w+@\w+.com(.br)?$/.test(email) && password.length > five) {
      setDisabled(false)
    }
    localStorage.setItem('mealsToken', 1)
    localStorage.setItem('cocktailsToken', 1)
  }

  const changeInput = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    btnDisabled()
  }

  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="email"
        data-testid="email-input"
        onChange={changeInput}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        data-testid="password-input"
        onChange={changeInput}
      />
      <button disabled={disabled} type="button" data-testid="login-submit-btn">
        Entrar
      </button>
    </>
  )
}

export default Forms
