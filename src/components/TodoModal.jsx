import React, { useEffect,  useState } from 'react'
import styles from '../styles/modules/modal.module.scss';
import {MdOutlineClose} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import Button from './Button';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { AnimatePresence, motion } from 'framer-motion';
import {v4 as uuid} from 'uuid';
import toast from 'react-hot-toast';


const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  };



export default function TodoModal(props) {
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.type === 'update' && props.todo) {
          setTitle(props.todo.title);
          setStatus(props.todo.status);
        } else {
          setTitle('');
          setStatus('incomplete');
        }
      }, [props.type, props.todo, props.modelOpen]);
    

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(title ===''){
            toast.error("Please enter a title");
            return;
        }
        if(title && status){
            if(props.type==='add'){
            dispatch(addTodo({
                id: uuid(),
                title:title,
                status:status,
                time: new Date().toLocaleString(),
            }));
            toast.success('Task Added Successfully');
      
        }
        else{
            if(props.todo.title!==title||props.todo.status!==status){
                dispatch(updateTodo({
                id:props.todo.id,
                title,
                status,
                }));
            }else{
                toast.error('No changes made');
                return;
            }
        }
        props.setModalOpen(false)
    }
        else{
            toast.error("Title shouldn't be empty");
        }
    }
    const [title, setTitle] = useState('');
    const [status,setStatus] = useState('incomplete');
    return (
    <AnimatePresence>
    {props.modelOpen && (
    <motion.div  initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} className={styles.wrapper}>
        <motion.div   variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.container}>
            <motion.div   // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }} className={styles.closeButton} onClick={()=>props.setModalOpen(false)}>
                <MdOutlineClose></MdOutlineClose>
            </motion.div>
            <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
                <h1 className={styles.formTitle}>{props.type==='update'?'Update':'Add'} Task</h1>
                <label htmlFor='title'>
                Title
                <input type='text' id='title' value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />    
                </label>    

                <label htmlFor='status'>
                Status
                <select type='status' id='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>    
                </label>    
                <div className={styles.buttonContainer}>
                    <Button type="submit" variant='primary'>{props.type==='update'?'Update':'Add'} Task</Button>
                    <Button type="button" variant='secondary'  onClick={()=>props.setModalOpen(false)}>Cancel</Button>
                </div>
            </form>
        </motion.div>
    </motion.div>
    )}
</AnimatePresence>
    );
}
