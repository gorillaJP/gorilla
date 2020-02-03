import mongoose from 'mongoose'

var jobAdd = {

    company: {
        type: String
    },
    title: {
        type: String
    },
    overview: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    experianceMin: {
        type: String
    },
    experianceMax: {
        type: String
    },
    type: {  //Perm / Contract / Parttimee 
        type: String
    },
    level: {  //Fresher, experiance mid level, Senior level
        type: String
    },
    industry: {
        type: String
    },
    salaryMin: {
        type: Number
    },
    salaryMax: {
        type: Number
    },
    bonus: {
        type: Number
    },
    bonusType: {  //per year, per quater, per month 
        type: String
    },
    expireDate: {
        type: Date
    },
    notifyEmail: {
        type: String
    },
    redirectURL: {
        type: String
    },
    skills: {
        type: Array
    }
}

var jobAddSchema = new mongoose.Schema(jobAdd, { timestamps: true }) //sets createdAt and updatedAt

var Jobs = mongoose.model('jobadd', jobAddSchema);

export default Jobs