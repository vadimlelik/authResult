import {createSlice} from "@reduxjs/toolkit";
import httpClient from "../api/http";

const initialState = {
    isLoading: true,
    entities: [],
    error: null,
}

export const qualitySlice = createSlice({
    name: "quality",
    initialState,
    reducers: {
        qualityRequest: (state, action) => {
            state.isLoading = true
        },
        qualitySuccess: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        qualityFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    },
})

const {reducer: qualityReducer, actions} = qualitySlice
const {qualityFailed, qualityRequest, qualitySuccess} = actions

export const fetchQuality = () => async (dispatch, getState) => {
    dispatch(qualityRequest())
    try {
        const {data} = await httpClient.get('quality')
        dispatch(qualitySuccess(data))
    } catch (e) {
        dispatch(qualityFailed(e.message))
    }
}

export const getQuality = (state) => {
    return state.quality.entities
}
export const isLoadingQuality = (state) => {
    return state.quality.isLoading
}
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.quality.entities && qualitiesIds ) {
        const qualityArray = []
        for (const qualId of qualitiesIds) {
            for (const quality of state.quality?.entities) {
                if (quality._id === qualId) {
                    qualityArray.push(quality)
                    break
                }
            }
        }
        return qualityArray
    }
    return []
}

export default qualityReducer