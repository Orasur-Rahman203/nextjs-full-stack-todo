import mongoose ,{ Schema } from "mongoose";
 
const TodoSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

const Todo = mongoose.model("Todo" , TodoSchema) || mongoose.models.Todo;

export default Todo;
