import axios from 'axios'

const loadMeta = () => {
    return ( dispatch, getState ) => {

        dispatch( {
            type: 'FETCH_META',
            payload: axios.get( '/api/meta/allcities' )
                .then( res => {
                    return res.data.payload.values
                } )
        } )
    }
}


export { loadMeta }
