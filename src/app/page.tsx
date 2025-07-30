// 'use client'
// import { IconEdit, IconTrash } from "@tabler/icons-react";
// import { title } from "process";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// type allTodosType=[
//   {
//   title:string,
//   name:string,
//   description:string,
//   _id:string,
// }
// ]


// export default function Page() {
// const [allTodos, setAllTodos]=useState<allTodosType[]>([])
// const [newTodo, setNewTodo]=useState({title:'', description:'', name:''})

// const fetchTodos= async ()=>{
//   try{
// const response = await fetch('https://nextjs-full-stack-todo.vercel.app//api/Todo');
// const data = await response.json();
// console.log('fetch data',data)
// setAllTodos(data.todos)
//   }catch(error){
//     console.error('Error fetch')
//   }
// }

// useEffect(()=>{
//   fetchTodos();

// }, [])

// const handleSubmit=async()=>{
//   // console.log("handleSubmit", newTodo)
//   if(!newTodo.title || !newTodo.name || !newTodo.description){
//     toast("Event has been created")
//     return
//   }
//   try{
//     const response = await fetch('https://nextjs-full-stack-todo.vercel.app//api/Todo',{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json",
//       },
//       body:JSON.stringify(newTodo)
//     });
//     const data=response.json();
//     setAllTodos([...allTodos, {title:newTodo.title, name:newTodo.name, description:newTodo.description}
//     ]);
//     setNewTodo({
//       title:'',
//       name:'',
//       description:''
//     })
//     toast.success("Todo added successfully")
//   }catch(error){
//     console.error("error", error)
//   }
// }


// const deletedTodo = async (id: string)=>{
//   try{
//     await fetch(`https://nextjs-full-stack-todo.vercel.app//api/Todo/?id=${id}`,{
//         method:"DELETE"
//       })
//     setAllTodos(allTodos.filter((todo: allTodosType)=>todo._id !== id));
//     toast.success("Todo deleted successfully!")
//   }catch(error){
//     toast.error("Failed to delete todo")
//   }
// }


//   return (
//     <div className="font-sans grid items-center justify-items-center gap-4">
//    <h1 className="text-black">All todo list:</h1>
//    <div className="bg-green-300 flex flex-col p-10 w-full h-72 gap-4 rounded">
//     <input
//     type="text"
//     placeholder="title"
//     value={newTodo.title}
//     className="text-black p-2 border-2 border-black rounded"
//     onChange={(e)=>setNewTodo({...newTodo, title:e.target.value})}
//     />
//     <input
//     type="text"
//     placeholder="name"
//     value={newTodo.name}
//     className="text-black p-2 border-2 border-black rounded"
//     onChange={(e)=>setNewTodo({...newTodo, name:e.target.value})}
//     />
//     <input
//     type="text"
//     placeholder="description"
//     value={newTodo.description}
//     className="text-black p-2 border-2 border-black rounded"
//     onChange={(e)=>setNewTodo({...newTodo, description:e.target.value})}
//     />
//     <button className="bg-blue-300 p-2 rounded" onClick={()=>handleSubmit()}>Add Todo</button>
//    </div>
//    <div className="bg-blue-500 w-full text-center p-4">
//     {
//       allTodos.map((todo:any)=>(
//         <div key={todo._id} className=" m-2 bg-white text-black p-2 rounded flex justify-between">
//       <div>
//             <h1>Name: {todo?.name}</h1>
//           <h1>Title: {todo?.title}</h1>
//           <h1>Description: {todo?.description}</h1>
//           </div>
//           <div className="flex items-center justify-center">
//             <button ><IconEdit /></button>
//             <button onClick={()=>deletedTodo(todo._id)}><IconTrash className="text-red-500"/></button>
//             </div>
//           </div>
//       ))
//     }
//    </div>
//     </div>
//   );
// }



'use client';

import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type TodoType = {
  title: string;
  name: string;
  description: string;
  _id: string;
};

export default function Page() {
  const [allTodos, setAllTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    name: ''
  });

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://nextjs-full-stack-todo.vercel.app/api/Todo');
      const data = await response.json();
      setAllTodos(data.todos || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async () => {
    const { title, name, description } = newTodo;
    if (!title || !name || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch('https://nextjs-full-stack-todo.vercel.app/api/Todo', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo)
      });

      const data = await response.json();

      setAllTodos((prev) => [...prev, data.todo]); // Add the returned todo from API
      setNewTodo({ title: '', name: '', description: '' });
      toast.success("Todo added successfully");
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to add todo");
    }
  };

  const deletedTodo = async (id: string) => {
    try {
      await fetch(`https://nextjs-full-stack-todo.vercel.app/api/Todo/?id=${id}`, {
        method: "DELETE"
      });
      setAllTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div className="font-sans grid items-center justify-items-center gap-4 p-4">
      <h1 className="text-black text-2xl font-semibold">All todo list:</h1>

      <div className="bg-green-300 flex flex-col p-6 w-full max-w-xl gap-4 rounded">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          className="text-black p-2 border-2 border-black rounded"
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newTodo.name}
          className="text-black p-2 border-2 border-black rounded"
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          className="text-black p-2 border-2 border-black rounded"
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white p-2 rounded" onClick={handleSubmit}>
          Add Todo
        </button>
      </div>

      <div className="bg-blue-500 w-full max-w-xl text-center p-4 rounded">
        {
          allTodos.map((todo) => (
            <div key={todo._id} className="m-2 bg-white text-black p-4 rounded flex justify-between items-center">
              <div className="text-left">
                <h1><strong>Name:</strong> {todo.name}</h1>
                <h1><strong>Title:</strong> {todo.title}</h1>
                <h1><strong>Description:</strong> {todo.description}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button><IconEdit /></button>
                <button onClick={() => deletedTodo(todo._id)}>
                  <IconTrash className="text-red-500" />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
