import React, { useReducer, useContext } from 'react'
import axios from "axios"

// Actions
// ***********************************************************
const DISPLAY_ALERT = 'SHOW_ALERT'
const CLEAR_ALERT = 'CLEAR_ALERT'

const REGISTER_USER_BEGIN = "REGISTER_USER_BEGIN"
const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"
const REGISTER_USER_ERROR = "REGISTER_USER_ERROR"


// Reducer
// ***********************************************************
const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!'
            }

        case CLEAR_ALERT:
            return{
                ...state,
                showAlert: false,
                alertType: "",
                alertText: ""
            }

        case REGISTER_USER_BEGIN: 
          return {
            ...state, isLoading: true
          }

        case REGISTER_USER_SUCCESS:
          return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.user.location,
            showAlert: true,
            alertType: "success",
            alertText: "User Created! Redirecting..."
          }

        case REGISTER_USER_ERROR:
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
          }
    
        default:
            break;
    }
}

// Context
// ***********************************************************

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
  userLocation: "",
  jobLocation: ""
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = () =>{
    dispatch({type: DISPLAY_ALERT})
    setTimeout(() => {
        clearAlert()
    }, 3000);
  }

  const clearAlert = () =>{
    dispatch({type: CLEAR_ALERT})
  }

  const registerUser = async (currentUser) => {
    dispatch({type: REGISTER_USER_BEGIN})
    try {
      const response = await axios.post("/api/auth/register", currentUser)
      // console.log(response.data)
      const {token, user} = response.data
      dispatch({type: REGISTER_USER_SUCCESS, payload: {token, user}})
    } catch (error) {
      console.log(error)
      dispatch({type: REGISTER_USER_ERROR, payload: {msg: error.response.data.msg}})
    }
    // Succes or Error shows an alert. Clear after seconds
    setTimeout(()=>{
      clearAlert()
    }, 3000)
  }

  return (
    <AppContext.Provider value={{...state, displayAlert, clearAlert, registerUser}}>
      {children}
    </AppContext.Provider>
  )
}

// Hook to use the context
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }