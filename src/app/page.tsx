'use client'
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { title } from "process";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
const [allTodos, setAllTodos]=useState<any>([])
const [newTodo, setNewTodo]=useState({title:'', description:'', name:''})

const fetchTodos= async ()=>{
  try{
const response = await fetch('http://localhost:3000/api/Todo');
const data = await response.json();
console.log('fetch data',data)
setAllTodos(data.todos)
  }catch(error){
    console.error('Error fetch')
  }
}

useEffect(()=>{
  fetchTodos();

}, [])

const handleSubmit=async()=>{
  // console.log("handleSubmit", newTodo)
  if(!newTodo.title || !newTodo.name || !newTodo.description){
    toast("Event has been created")
    return
  }
  try{
    const response = await fetch('http://localhost:3000/api/Todo',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(newTodo)
    });
    const data=response.json();
    setAllTodos([...allTodos, {title:newTodo.title, name:newTodo.name, description:newTodo.description}
    ]);
    setNewTodo({
      title:'',
      name:'',
      description:''
    })
    toast.success("Todo added successfully")
  }catch(error){
    console.error("error", error)
  }
}


const deletedTodo = async (id: string)=>{
  try{
    await fetch(`http://localhost:3000/api/Todo/?id=${id}`,{
        method:"DELETE"
      })
    setAllTodos(allTodos.filter((todo: any)=>todo._id !== id));
    toast.success("Todo deleted successfully!")
  }catch(error){
    toast.error("Failed to delete todo")
  }
}


  return (
    <div className="font-sans grid items-center justify-items-center gap-4">
   <h1 className="text-black">All todo list:</h1>
   <div className="bg-green-300 flex flex-col p-10 w-full h-72 gap-4 rounded">
    <input
    type="text"
    placeholder="title"
    value={newTodo.title}
    className="text-black p-2 border-2 border-black rounded"
    onChange={(e)=>setNewTodo({...newTodo, title:e.target.value})}
    />
    <input
    type="text"
    placeholder="name"
    value={newTodo.name}
    className="text-black p-2 border-2 border-black rounded"
    onChange={(e)=>setNewTodo({...newTodo, name:e.target.value})}
    />
    <input
    type="text"
    placeholder="description"
    value={newTodo.description}
    className="text-black p-2 border-2 border-black rounded"
    onChange={(e)=>setNewTodo({...newTodo, description:e.target.value})}
    />
    <button className="bg-blue-300 p-2 rounded" onClick={()=>handleSubmit()}>Add Todo</button>
   </div>
   <div className="bg-blue-500 w-full text-center p-4">
    {
      allTodos.map((todo:any)=>(
        <div className=" m-2 bg-white text-black p-2 rounded flex justify-between">
      <div>
            <h1>Name: {todo?.name}</h1>
          <h1>Title: {todo?.title}</h1>
          <h1>Description: {todo?.description}</h1>
          </div>
          <div className="flex items-center justify-center">
            <button ><IconEdit /></button>
            <button onClick={()=>deletedTodo(todo._id)}><IconTrash className="text-red-500"/></button>
            </div>
          </div>
      ))
    }
   </div>
    </div>
  );
}
