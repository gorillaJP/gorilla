import mongoose from 'mongoose'

var metaData = {

    name: {
        type: String,
        index: true,
        unique: true
    }
}

var metaSectorsSchema = new mongoose.Schema( metaData )

var Meta_sectors= mongoose.model( 'metasectors', metaSectorsSchema  );

export default  Meta_sectors
