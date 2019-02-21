import { createStore, applyMiddleware, compose } from 'redux';
import { routes } from '../routes';
import thunk from 'redux-thunk';
import api from '../midleware/api';
import rootReducer from '../reducers/index';
import persistState from 'redux-localstorage'


export function createMainStore(reduxReactRouter, createHistory, initialState) {
    let devTool = f => f;
    let persistStorage = f => f;
    if (typeof window !== 'undefined') {
        if (window.devToolsExtension) {
            devTool = window.devToolsExtension()
        }
        persistStorage = persistState('persist', {})
    }

    let finalCreateStore = compose(
        applyMiddleware(thunk, api),
        reduxReactRouter({
            routes,
            createHistory: createHistory
        }),
        persistStorage,
        devTool
    )(createStore);

    return finalCreateStore(rootReducer, initialState);
}
