import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    entities: [],
    isLoading: false,
    error: false,
    auth: {userId: null},
    isLoggedIn: false,
    dataLoaded: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    // extraReducers
})

export const login = () => (dispatch, getState) => {

}
export const logout = () => (dispatch, getState) => {

}

export const signup = () => (dispatch, getState) => {

}
export const createUser = () => (dispatch, getState) => {
}


export const {reducer: authSliceReducer, actions} = authSlice
export const {} = actions