import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';
export default function AppContent() {
  
  const todoList = useSelector(state=>state.todo.todoList);
  const sortedToDoList = [...todoList];
  sortedToDoList.sort((a,b)=>new Date(b.time)-new Date(a.time));
  const filterStatus= useSelector(state=>state.todo.filterStatus);
  const filteredTodoList = sortedToDoList.filter(item=>{
      if(filterStatus==='all'){
        return true;
      }
      return item.status===filterStatus;
  });
  return (
    <div className={styles.content_wrapper}>
    {
      filteredTodoList && filteredTodoList.length>0 ? filteredTodoList.map((todo)=><TodoItem key={todo.id} todo={todo}/>):"No todo's found"
    }
    </div>
  )
}
