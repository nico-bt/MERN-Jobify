import { useState, useEffect } from 'react'
import { Logo, Alert, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import {Navigate, useNavigate} from "react-router-dom"

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}


function Register() {
  const [values, setValues] = useState(initialState)
  const navigate = useNavigate()
  
  // appContext to get global values
  const {user, isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext()
  

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }

    const currentUser = {name, email, password}
    if(isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  }

  // If user is returned from de appContext, redirect to home
  useEffect(() => {
    if(user) {
      navigate("/all-jobs")
    }
  }, [user, navigate])
  
  
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember? "Login" : "Register"}</h3>

        {showAlert && <Alert />}

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember? "Not a member yet?" : "Already a member?"}
          <button type='button' onClick={toggleMember} className="member-btn">
            {values.isMember? "Register" : "Login"}
          </button>

        </p>
      </form>
    </Wrapper>
  )
}

export default Register