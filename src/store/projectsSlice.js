import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [],
    isLoading: false,
    error: null,
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        fetchProjectsStart(state) {
        state.isLoading = true;
        state.error = null;
        },
        fetchProjectsSuccess(state, action) {
        state.isLoading = false;
        state.projects = action.payload;
        },
        fetchProjectsError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
        },
        addProjectStart(state) {
        state.isLoading = true;
        state.error = null;
        },
        addProjectSuccess(state, action) {
        state.isLoading = false;
        state.projects.push(action.payload);
        },
        addProjectError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
        },
        updateProjectStart(state) {
        state.isLoading = true;
        state.error = null;
        },
        updateProjectSuccess(state, action) {
        state.isLoading = false;
        const projectIndex = state.projects.findIndex(
            (p) => p.id === action.payload.id
        );
        state.projects[projectIndex] = action.payload;
        },
        updateProjectError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
        },
        deleteProjectStart(state) {
        state.isLoading = true;
        state.error = null;
        },
        deleteProjectSuccess(state, action) {
        state.isLoading = false;
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        },
        deleteProjectError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
        },
    },
});

export const {
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsError,
    addProjectStart,
    addProjectSuccess,
    addProjectError,
    updateProjectStart,
    updateProjectSuccess,
    updateProjectError,
    deleteProjectStart,
    deleteProjectSuccess,
    deleteProjectError,
} = projectsSlice.actions;

export default projectsSlice.reducer;