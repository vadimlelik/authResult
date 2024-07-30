import {createSlice} from "@reduxjs/toolkit";
import httpClient from "../api/http";


const initialState = {
    isLoading: false,
    error: null,
    entities: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        postRequest: (state) => {
            state.isLoading = true
        },
        postsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        postRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    },
})

export const {reducer: postReducer, actions} = postSlice
export const {postRequest, postsReceived, postRequestFailed} = actions


export const fetchPost = () => async (dispatch, getState) => {
    dispatch(postRequest())
    try {
        const {data} = await httpClient.get('posts')
        dispatch(postsReceived(data))
    } catch (e) {
        postRequestFailed(e.message)
    }
}

export const getAllPosts = (state) => {
    return state.posts.entities
}

export const getPostIsLoading = (state) => {
    return state.posts.isLoading
}
export const  getPostIsError = (state) => {
    return state.posts.error
}

