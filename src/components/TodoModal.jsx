import React, { useEffect,  useState } from 'react'
import styles from '../styles/modules/modal.module.scss';
import {MdOutlineClose} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import Button from './Button';
import { addTodo, updateTodo } from '../slices/todoSlice';
import {v4 as uuid} from 'uuid';
import toast from 'react-hot-toast';

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
                ...props.todo,
                title,
                status,
                }));
            }else{
                toast.error('No changes made');
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
    props.modelOpen && (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.closeButton} onClick={()=>props.setModalOpen(false)}>
                <MdOutlineClose></MdOutlineClose>
            </div>
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
        </div>
    </div>
    )
  );
}
