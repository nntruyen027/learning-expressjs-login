const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LearningExpressJs',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
})

let account = new mongoose.model('account', accountSchema);


module.exports = account