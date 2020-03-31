/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList"
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"


// /////////////////////////////////////////////
// Variables
// /////////////////////////////////////////////

const userDefaults = {
  uid         : 1,          // From Auth
  displayName : "John Doe", // From Auth
  name        : "John", 
  lastname    : "Doe", 
  //about       : "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
  photoURL    : require("@assets/images/portrait/users/avatar.jpg"), // From Auth
  //status      : "online",
  //userRole    : "admin",
  email       : "email@email.cl",
  telefono    : "73118560",
  rut         : "163705052",
  empresa_id     : 1,
  created_at      : "",
  updated_at : "",
  habilitado : 1,
  imagen : require("@assets/images/portrait/users/avatar.jpg"),
}

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
    AppActiveUser           : userDefaults,
    bodyOverlay             : false,
    isVerticalNavMenuActive : true,
    mainLayoutType          : themeConfig.mainLayoutType || "vertical",
    navbarSearchAndPinList  : navbarSearchAndPinList,
    reduceButton            : themeConfig.sidebarCollapsed,
    verticalNavMenuWidth    : "default",
    verticalNavMenuItemsMin : false,
    scrollY                 : 0,
    starredPages            : navbarSearchAndPinList["pages"].data.filter((page) => page.is_bookmarked),
    theme                   : themeConfig.theme || "light",
    themePrimaryColor       : colors.primary,

    // Can be used to get current window with
    // Note: Above breakpoint state is for internal use of sidebar & navbar component
    windowWidth: null,
}

export default state
