import React, { useEffect, useState } from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import {getClasses} from '../utils/getClasses';
import {format} from 'date-fns/esm';
import {MdDelete,MdEdit} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import {toast} from 'react-hot-toast';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

export default function TodoItem(props) {
  const [checked,setChecked] = useState(false);

  useEffect(()=>{
    if(props.todo.status==='complete'){
      setChecked(true);
    }
    else{
      setChecked(false);
    }
  },[props.todo.status]);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () =>{
      dispatch(deleteTodo(props.todo.id));
      toast.success("Todo Deleted Successfully");
  }

  const handleUpdate = ()=>{
    setUpdateModalOpen(true);
  };

  const handleChecked=()=>{
    setChecked(!checked);
    dispatch(updateTodo({
      ...props.todo,
      status:checked?'incomplete':'complete'
    }));
  };

  return (
    <>
    <div className={styles.item}>
      <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleChecked={handleChecked}></CheckButton>
          <div className={styles.texts}>
            <p className={getClasses([styles.todoText,props.todo.status==='complete'&& styles['todoText--completed'],])}>{props.todo.title}</p>

            <p className={styles.time}>
              {format(new Date(props.todo.time),'p,MM/dd/yyy')}
            </p>
         
          </div>
      </div>
      <div className={styles.todoActions}>
        <div className={styles.icon} onClick={handleDelete} role="button" tabIndex={0}>
          <MdDelete/>
        </div>
        <div className={styles.icon}
        onClick={handleUpdate} role="button" tabIndex={0}
        >  
        <MdEdit/>
        </div>
      </div>
  </div>
  <TodoModal
        type="update"
        modelOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={props.todo}
      />
  </>
  )
}
