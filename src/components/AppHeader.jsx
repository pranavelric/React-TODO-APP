import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import {useDispatch, useSelector} from 'react-redux';
import { updateFilterStatus } from '../slices/todoSlice';

export default function AppHeader() {
  const [modelOpen,setModalOpen] = useState(false);
  const filterStatus= useSelector(state=>state.todo.filterStatus);
  const dispatch = useDispatch();
  const updateFilter = (event)=>{
    dispatch(updateFilterStatus(event.target.value));
  }
  return (
      <div className={styles.app_header}>
    <Button variant='primary' onClick={()=>setModalOpen(true)}>AddTask</Button>
    <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
    </SelectButton>
    <TodoModal  type='add' modelOpen={modelOpen} setModalOpen={setModalOpen}/>
  </div>
  )
}
