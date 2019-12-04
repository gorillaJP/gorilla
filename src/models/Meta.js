import mongoose from 'mongoose'

var metaData = {

    property: {
        type: String,
        index: true,
        unique: true
    },
    values: {
        type: Array
    }
}

var metaDataSchema = new mongoose.Schema( metaData )

var Meta = mongoose.model( 'metaData', metaDataSchema );

export default Meta
