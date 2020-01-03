/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_ITEMS(state, items) {
    state.items = items
  },
  REMOVE_RECORD(state, itemId) {
      const itemIndex = state.items.findIndex((u) => u.id == itemId)
      state.items.splice(itemIndex, 1)
  },
  REMOVE_MASSIVE_RECORD(state, itemsDelete) {
    itemsDelete.forEach(function(element) {
      var itemIndex = state.items.findIndex((u) => u.id == element.id)
      state.items.splice(itemIndex, 1)       
    });
    
  },
}
