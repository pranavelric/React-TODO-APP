import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';

export default function AppContent() {
  
  const todoList = useSelector(state=>state.todo.todoList);
  const sortedToDoList = [...todoList];
  sortedToDoList.sort((a,b)=>new Date(b.time)-new Date(a.time));
  return (
    <>
    {
      sortedToDoList && sortedToDoList.length>0 ? sortedToDoList.map((todo)=><TodoItem key={todo.id} todo={todo}/>):"No todo's found"
    }
    </>
  )
}
