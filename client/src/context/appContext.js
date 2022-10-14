import React, { useReducer, useContext } from 'react'
import axios from "axios"

// Actions
// ***********************************************************
const DISPLAY_ALERT = 'SHOW_ALERT'
const CLEAR_ALERT = 'CLEAR_ALERT'

const REGISTER_USER_BEGIN = "REGISTER_USER_BEGIN"
const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"
const REGISTER_USER_ERROR = "REGISTER_USER_ERROR"

const LOGIN_USER_BEGIN = "LOGIN_USER_BEGIN"
const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
const LOGIN_USER_ERROR = "LOGIN_USER_ERROR"

const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"

const LOG_OUT = "LOG_OUT"

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
    
        case LOGIN_USER_BEGIN: 
          return {
            ...state, isLoading: true
          }

        case LOGIN_USER_SUCCESS:
          return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.user.location,
            showAlert: true,
            alertType: "success",
            alertText: "Login Successful! Redirecting..."
          }

        case LOGIN_USER_ERROR:
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
          }
    
        case TOGGLE_SIDEBAR:
          return {
            ...state,
            showSidebar: !state.showSidebar
          }

          case LOG_OUT:
            return {
              ...initialState,
              user: null,
              token: null,
              userLocation: ""
            }

        default:
            break;
    }
}

// Context
// ***********************************************************

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user? JSON.parse(user) : null,
  token: token,
  userLocation: user? JSON.parse(user).location : "",
  jobLocation: "",
  showSidebar: false
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Alert functions show/clear:
  //---------------------------------
  const displayAlert = () =>{
    dispatch({type: DISPLAY_ALERT})
    setTimeout(() => {
      clearAlert()
    }, 3000);
  }
  
  const clearAlert = () =>{
    dispatch({type: CLEAR_ALERT})
  }
  
  //Local storage functions:
  //---------------------------------
  const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }
  

  // Register and Login User functions:
  //---------------------------------
  const registerUser = async (currentUser) => {
    dispatch({type: REGISTER_USER_BEGIN})
    try {
      const response = await axios.post("/api/auth/register", currentUser)
      const {token, user} = response.data
      
      dispatch({type: REGISTER_USER_SUCCESS, payload: {token, user}})
      addUserToLocalStorage({user, token})
      
    } catch (error) {
      console.log(error)
      dispatch({type: REGISTER_USER_ERROR, payload: {msg: error.response.data.msg}})
    }
    // Succes or Error shows an alert. Clear after seconds
    setTimeout(()=>{
      clearAlert()
    }, 3000)
  }
  
  const loginUser = async (currentUser) => {
    dispatch({type: LOGIN_USER_BEGIN})
    try {
      const response = await axios.post("api/auth/login", currentUser)
      const {token, user} = response.data
      
      dispatch({type: LOGIN_USER_SUCCESS, payload: {token, user}})
      addUserToLocalStorage({user, token})
      
    } catch (error) {
      dispatch({type: LOGIN_USER_ERROR, payload: {msg: error.response.data.msg}})
    }
    // Succes or Error shows an alert. Clear after seconds
    setTimeout(()=>{
      clearAlert()
    }, 3000)
  }

  const logOut = () => {
    removeUserFromLocalStorage()
    dispatch({type: LOG_OUT})
  }


  // Toggle btns from navbar
  //---------------------------------
  
  const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
  }

  return (
    <AppContext.Provider value={{...state, displayAlert, clearAlert, registerUser, loginUser, toggleSidebar, logOut}}>
      {children}
    </AppContext.Provider>
  )
}

// Hook to use the context
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }