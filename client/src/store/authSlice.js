import {createSlice} from "@reduxjs/toolkit";
import authServices from "../api/authServices";
import localStorageService from "../api/localStorageService";
import http from "../api/http";

const initialState = localStorageService.getAccessToken() ? {
    user: null,
    isLoading: true,
    error: false,
    auth: {userId: localStorageService.getUserId()},
    isLoggedIn: true,
    dataLoaded: false
} : {
    user: null,
    isLoading: true,
    error: false,
    auth: {userId: null},
    isLoggedIn: false,
    dataLoaded: false

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
            state.isLoggedIn = false
            state.user = null
            state.isLoading = false
            state.auth.userId = null
        },
        authUserRequested: (state, action) => {
            state.isLoading = true

        },
        authUserFailed: (state, action) => {
            state.error = action.payload
        },
        authUserRequestedSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
    },
    // extraReducers
})
export const {reducer: authSliceReducer, actions} = authSlice
export const {
    authRequest,
    authRequestFailed,
    authRequestedSuccess,
    userLoggedOut,
    authUserRequestedSuccess,
    authUserFailed,
    authUserRequested
} = actions

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
    navigate('/auth/sign-in')
}

export const authMe = () => async (dispatch, getState) => {
    dispatch(authUserRequested())
    try {
        const {data} = await http.get('/users/me')
        dispatch(authUserRequestedSuccess(data))
    } catch (e) {
        dispatch(authUserFailed(e.message))
    }
}

export const signup = (payload) => async (dispatch, getState) => {
    dispatch(authRequest())
    try {
        const data = await authServices.register(payload)
        localStorageService.setToken(data)
        dispatch(authRequestedSuccess(data))
    } catch (e) {
        dispatch(authRequestFailed(e.message))
    }
}
export const getIsLoggedIn = (state) => state.auth.isLoggedIn
export const getAuthUserRole = (state)=>state.auth?.user?.role

export const getIsLoadingAuth = (state) => state.auth.isLoading
export const getIdUser = (state) => state.auth.auth.userId