import connectDB from "@/lib/database";
import Todo from "../../../../model/todo.model";
import { NextResponse } from "next/server";

export async function POST(request : any) {
    const {title, description, name}=await request.json();
    await connectDB();
    const todo = await Todo.create({title, name, description});
    return NextResponse.json({
        message:"Todo created successfully",
        todo:todo
    });
}


export async function GET() {
    await connectDB();
    const todos = await Todo.find();
    return NextResponse.json({
        todos:todos
});
}

export async function DELETE(request : any) {
    const id = request.nextUrl.searchParams.get('id');
    await connectDB();
   const todosDel= await Todo.findByIdAndDelete(id);
    return NextResponse.json({
        message: "Todo deleted successfully!",
        todosDel:todosDel
    });
}

// type res={
//     id:String, 
//     title:String, 
//     description:String, 
//     name:String
// }


export async function PUT(request:any) {
    const {id, title, description, name} = await request.json();
    await connectDB();
    const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        {
            title,
            name,
            description
        },{
            new:true
        });
        return NextResponse.json({
            message: "Todo updated successfully",
            todos:updatedTodo
        });
}