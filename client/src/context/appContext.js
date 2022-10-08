import React, { useReducer, useContext } from 'react'

// Actions
// ***********************************************************
const DISPLAY_ALERT = 'SHOW_ALERT'
const CLEAR_ALERT = 'CLEAR_ALERT'


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

  return (
    <AppContext.Provider value={{...state, displayAlert, clearAlert}}>
      {children}
    </AppContext.Provider>
  )
}

// Hook to use the context
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }