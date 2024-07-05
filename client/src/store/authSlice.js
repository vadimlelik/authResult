import {createSlice} from "@reduxjs/toolkit";
import authServices from "../api/authServices";
import localStorageService from "../api/localStorageService";

const initialState = localStorageService.getAccessToken() ? {
    entities: null,
    isLoading: true,
    error: false,
    auth: {userId: localStorageService.getUserId()},
    isLoggedIn: true
} : {
    entities: null,
    isLoading: true,
    error: false,
    auth: {userId: null},
    isLoggedIn: false,

}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest: (state, action) => {
            state.isLoading = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestedSuccess: (state, action) => {
            state.isLoading = false
            state.auth.userId = action.payload.userId
            state.isLoggedIn = true

        },
        userLoggedOut: (state,) => {
            state.auth.isLoggedIn = false
            state.isLoading = false
            state.auth.userId = null
        }
    },
    // extraReducers
})
export const {reducer: authSliceReducer, actions} = authSlice
export const {authRequest, authRequestFailed, authRequestedSuccess, userLoggedOut} = actions

export const login = (payload, navigate) => async (dispatch, getState) => {
    dispatch(authRequest())
    try {
        const data = await authServices.login(payload)
        localStorageService.setToken(data)
        dispatch(authRequestedSuccess(data))
        navigate('/')
    } catch (e) {
        dispatch(authRequestFailed(e.message))
    }
}
export const logout = (navigate) => (dispatch, getState) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    navigate('/auth/signUp')
}

export const signup = (payload, navigate) => async (dispatch, getState) => {
    dispatch(authRequest())
    try {
        const data = await authServices.register(payload)
        localStorageService.setToken(data)
        dispatch(authRequestedSuccess(data))
        navigate('/')
    } catch (e) {
        dispatch(authRequestFailed(e.message))
    }
}

// selectors

 export  const getIsLoggedIn = (state) => state.auth.isLoggedIn


