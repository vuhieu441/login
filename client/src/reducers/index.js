  
import { combineReducers } from 'redux'
import userReducer from './usersReducer'
const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer