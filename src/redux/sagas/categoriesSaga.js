import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* categoriesSaga() {
    // Gets all the visible categories for the Admin page
    yield takeEvery('FETCH_VISIBLE_CATEGORIES', fetchVisibleCategories);
    // Gets all the hidden categories for the Admin page
    yield takeEvery('FETCH_HIDDEN_CATEGORIES', fetchHiddenCategories);
    // Adds a new category
    yield takeEvery('ADD_CATEGORY', addCategory);
    // Hides a category
    yield takeEvery('HIDE_CATEGORY', hideCategory);
}

// Sends a GET request to /api/categories to get all visible categories
function* fetchVisibleCategories(action) {
    try {
        const response = yield axios.get(`/api/categories`);
        // Stores all data received in the categories reducer
        yield put({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
        console.log('Error with getting visible categories', error);
    }
}

// Sends a GET request to /api/categories/hidden to get all hidden categories
function* fetchHiddenCategories(action) {
    try {
        const response = yield axios.get(`/api/categories/hidden`)
        yield put({ type: 'SET_HIDDEN_CATEGORIES', payload: response.data });
    } catch (error) {
        console.log('Error with getting hidden categories', error);
    }
}

// Sends a POST request to api/categories/add to add a category
function* addCategory(action) {
    try {
        yield axios.post(`api/categories/add`, action.payload);
        yield put ({ type: 'FETCH_VISIBLE_CATEGORIES', fetchVisibleCategories});
    } catch (error) {
        console.log('Error with adding category');
    }
}

// Sends a PUT request to api/categories/:id to hide a category
function* hideCategory(action) {
    try {
        yield axios.put(`api/categories/${action.payload}`)
    } catch (error) {
        console.log('Error with hiding category');
    }
}