import {combineReducers} from 'redux'

function accountChanger(state = {account: {}}, action) {
   switch (action.type) {
      case 'CHANGE_ACCOUNT':
         return {account: action.newAccount}
      default:
         return state
   }
}

export default combineReducers({
  accountChanger
})
