import mongoose from 'mongoose'

var jobAdd = {

    company: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    experiance: {
        type: String
    },
    skills: {
        type: Array
    }
}

var jobAddSchema = new mongoose.Schema( jobAdd )

var Jobs = mongoose.model( 'jobadd', jobAddSchema );

export default Jobs