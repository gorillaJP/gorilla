
import axios from 'axios'
import store from '../store'

console.log( 'awesome' )


axios.interceptors.request.use( function ( config ) {
    const token = store.store.getState().session ? 'Bearer ' + store.store.getState().session.token : null;
    config.headers.Authorization = token;

    return config;
} );