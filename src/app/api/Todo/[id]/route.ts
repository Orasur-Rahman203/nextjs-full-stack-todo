// import connectDB from "@/lib/database";
// import Todo from "../../../../../model/todo.model";
// import { NextResponse } from "next/server";



// export async function GET({params:any}) {
//     const {id} = await params;
//     console.log('id numbers-----------', id)
//     await connectDB();
//    const todoSingle= await Todo.findById(id)
//     return NextResponse.json({
//         message: "Single todo get successfully!",
//         // todo:todoSingle
//     });
// }

import connectDB from "@/lib/database";
import { NextResponse } from "next/server";
import Todo from "../../../../../model/todo.model";
 

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectDB();

    const todoSingle = await Todo.findById("68889f4ad1447a3aa71cea6e");

    if (!todoSingle) {
      return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Single todo fetched successfully!",
        todo: id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
