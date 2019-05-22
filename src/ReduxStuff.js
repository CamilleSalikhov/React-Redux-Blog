import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

//types
const FETCH_POST = 'FETCH_POST';
const NEW_POST = 'NEW_POST';
//actions
const fetchPosts = () =>dispatch => {
     
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => dispatch({
        type: FETCH_POST,
        load: data
    }));
}


const createPosts = (postData) =>dispatch => {
    console.log('action called');
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(post => dispatch({
        type:NEW_POST,
        load:post
    }));
}


//postReducer
const inititalState = {
    items:[],
    item: {}
};

const postReducer = (state=inititalState, action) => {
    switch(action.type) {
        case FETCH_POST:
            return {
                ...state,
                items:action.load
            }
        case NEW_POST:
                return {
                    ...state,
                    item:action.load
                }
        default:
            return state;
    }
}


//combine all reducers
const rootReducer = combineReducers(
    {posts: postReducer}
);
//creating a store
const middleware = [thunk];
const store = createStore(rootReducer,{},compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
    ));








//exporting
export {store};
export {fetchPosts};
export {createPosts}