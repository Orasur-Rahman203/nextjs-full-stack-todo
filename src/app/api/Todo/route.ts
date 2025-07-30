// import connectDB from "@/lib/database";
// import Todo from "../../../../model/todo.model";
// import { NextResponse } from "next/server";

// type allTodosType={
//   title:string,
//   name:string,
//   description:string,
//   _id:string,
// }



// export async function POST(request: Request) {
//     const {title, description, name}: allTodosType=await request.json();
//     await connectDB();
//     const todo = await Todo.create({title, name, description});
//     return NextResponse.json({
//         message:"Todo created successfully",
//         todo:todo
//     });
// }


// export async function GET() {
//     await connectDB();
//     const todos = await Todo.find();
//     return NextResponse.json({
//         todos:todos
// });
// }

// export async function DELETE(request : any) {
//     const id = request.nextUrl.searchParams.get('id');
//     await connectDB();
//    const todosDel= await Todo.findByIdAndDelete(id);
//     return NextResponse.json({
//         message: "Todo deleted successfully!",
//         todosDel:todosDel
//     });
// }

// // type res={
// //     id:String, 
// //     title:String, 
// //     description:String, 
// //     name:String
// // }


// export async function PUT(request:any) {
//     const {id, title, description, name} = await request.json();
//     await connectDB();
//     const updatedTodo = await Todo.findByIdAndUpdate(
//         id,
//         {
//             title,
//             name,
//             description
//         },{
//             new:true
//         });
//         return NextResponse.json({
//             message: "Todo updated successfully",
//             todos:updatedTodo
//         });
// }


import connectDB from "@/lib/database";
import Todo from "../../../../model/todo.model";
import { NextRequest, NextResponse } from "next/server";

// Type for a single Todo
type TodoType = {
  title: string;
  name: string;
  description: string;
};

// ✅ Create a Todo (POST)
export async function POST(request: Request) {
  try {
    const { title, description, name }: TodoType = await request.json();
    await connectDB();
    const todo = await Todo.create({ title, name, description });
    return NextResponse.json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

// ✅ Get All Todos (GET)
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find();
    return NextResponse.json({ todos });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// ✅ Delete a Todo (DELETE)
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectDB();
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Todo deleted successfully",
      deletedTodo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

// ✅ Update a Todo (PUT)
export async function PUT(request: Request) {
  try {
    const { id, title, description, name } = await request.json();

    if (!id || !title || !description || !name) {
      return NextResponse.json(
        { error: "All fields including ID are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, name, description },
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
