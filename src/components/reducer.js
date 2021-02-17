import * as actionTypes from "./actionTypes";

const initialState = {}

const AppReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.LOGIN_USER:
            return {
                ...state,
                loginDetails: { ...action.payload }
            }

    }
}

export default AppReducer