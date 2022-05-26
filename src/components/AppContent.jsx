import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';
import { motion, useMotionValue, useTransform,AnimatePresence } from 'framer-motion';

const containerVariant= {
  hidden:{opacity:0},
  visible:{opacity:1,
    scale:1,
    transition:{
      staggerChildren:0.2,
    },
  },
}
const childVariant = {
  hidden:{y:20,opacity:0},
  visible:{
    y:0,
    opacity:1,
  }
}
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
    <motion.div 
    variants={containerVariant}
    initial='hidden'
    animate='visible'
    className={styles.content_wrapper}>
    <AnimatePresence>
    {
      filteredTodoList && filteredTodoList.length>0 ? filteredTodoList.map((todo)=><TodoItem  key={todo.id} todo={todo}/>):<motion.p variants={childVariant} className={styles.empty_text}>No todo's found</motion.p>
    }
    </AnimatePresence>
    </motion.div>
  )
}
