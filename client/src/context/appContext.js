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
const UPDATE_USER = "UPDATE_USER"

const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN'
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'

const HANDLE_CHANGE = 'HANDLE_CHANGE'
const CLEAR_VALUES = 'CLEAR_VALUES'

const CREATE_JOB_BEGIN = 'CREATE_JOB_BEGIN'
const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS'
const CREATE_JOB_ERROR = 'CREATE_JOB_ERROR'


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

        case UPDATE_USER_BEGIN: 
          return { ...state, isLoading: true }
            
        case UPDATE_USER_SUCCESS: 
          return {
            ...state,
            isLoading: false,
            token:action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
          }
            
        case UPDATE_USER_ERROR: 
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
          }

          case HANDLE_CHANGE:
            return {
              ...state,
              [action.payload.name]: action.payload.value
            }

          case CLEAR_VALUES:
            return { ...state, ...initialState }

          case CREATE_JOB_BEGIN:
            return { ...state, isLoading: true }
          
          case CREATE_JOB_SUCCESS:
            return {
              ...state,
              isLoading: false,
              showAlert: true,
              alertType: 'success',
              alertText: 'New Job Created!',
            }
          
          case CREATE_JOB_ERROR:
            return {
              ...state,
              isLoading: false,
              showAlert: true,
              alertType: 'danger',
              alertText: action.payload.msg,
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
  showSidebar: false,
  // For adding job
  jobLocation: user? JSON.parse(user).location : "",
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  // jobLocation
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Axios setup (base url and add token)
  //--------------------------------------------
  const authFetch = axios.create({
    baseURL: '/api',
  })

  // request interceptor (from axios docs - Similar to middleware, previous to request we add the token)
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
// response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error)
      if (error.response.status === 401) {
        logOut()
        console.log('AUTH ERROR')
      }
      return Promise.reject(error)
    }
  )

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
  

  // User functions --> Register / Login / Logout / Update functions:
  //-------------------------------------------------------------------------
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
  

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
  
      // no token
      const { user, token } = data
  
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token }
      })
  
      addUserToLocalStorage({ user, token })
    } catch (error) {
      // If is NOT Authorized, redirect to login/register in the axios interceptor. Dont show alert
      if(error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    setTimeout(()=>{clearAlert()}, 3000)
  }

  // Toggle btns from navbar
  //---------------------------------
  const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
  }
  
  
  // Handle inputs from add Job
  //---------------------------------
  const handleChange = ({name, value}) => {
    dispatch({type: HANDLE_CHANGE, payload:{name, value}})
  }

  // ADD Job
  //---------------------------------
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const { position, company, jobLocation, jobType, status } = state
  
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: CLEAR_VALUES })
      dispatch({type: CREATE_JOB_SUCCESS})
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    setTimeout(()=>{clearAlert()},3000)
  }


  return (
    <AppContext.Provider value={{...state, displayAlert, clearAlert, registerUser, loginUser, toggleSidebar, logOut, updateUser, handleChange, createJob}}>
      {children}
    </AppContext.Provider>
  )
}

// Hook to use the context
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }