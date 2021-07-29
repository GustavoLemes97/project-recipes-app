import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Forms() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)

  const btnDisabled = () => {
    const five = 5
    if (/^\w+@\w+.com(.br)?$/.test(email) && password.length > five) {
      setDisabled(false)
    }
  }

  const changeInput = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    btnDisabled()
  }

  const buttonClick = () => {
    localStorage.setItem('mealsToken', 1)
    localStorage.setItem('cocktailsToken', 1)
    localStorage.setItem('user', JSON.stringify({ email }))
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
      <Link to="/comidas">
        <button
          disabled={disabled}
          onClick={buttonClick}
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </Link>
    </>
  )
}

export default Forms
