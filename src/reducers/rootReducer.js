import {combineReducers} from 'redux'

function accountChanger(state = {account: {}}, action) {
   switch (action.type) {
      case 'CHANGE_ACCOUNT':
         return {account: action.newAccount}
      default:
         return state
   }
}

function restaurantChanger(state = {restaurant: {}}, action) {
   switch (action.type) {
      case 'CHANGE_RESTAURANT':
         return {restaurant: action.newRestaurant}
      default:
         return state
   }
}

function menuChanger(state = {menu: []}, action) {
   switch (action.type) {
      case 'CHANGE_MENU':
         return {menu: action.newMenu}
      default:
         return state
   }
}

function locationChanger(state = {location: ""}, action) {
   switch (action.type) {
      case 'CHANGE_LOCATION':
         return {location: action.newLocation}
      default:
         return state
   }
}

export default combineReducers({
  accountChanger,
  restaurantChanger,
  menuChanger,
  locationChanger,
})
