import React, { useEffect, useState } from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import {getClasses} from '../utils/getClasses';
import {format} from 'date-fns/esm';
import {MdDelete,MdEdit} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/todoSlice';
import {toast} from 'react-hot-toast';
import TodoModal from './TodoModal';

export default function TodoItem(props) {

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () =>{
      dispatch(deleteTodo(props.todo.id));
      toast.success("Todo Deleted Successfully");
  }

  const handleUpdate = ()=>{
    setUpdateModalOpen(true);
  }

  return (
    <>
    <div className={styles.item}>
      <div className={styles.todoDetails}>
          []
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
