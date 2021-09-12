const { model, Types, Schema} = require("mongoose")




const shema = new Schema ({
    name: {type : String},
    lastName: {type: String},
    number: {type: Number, unique: true},
    password : {type: String},
    posts: [{type: Types.ObjectId, ref: "Post"}],
    
    
})

 
module.exports = model("User", shema)