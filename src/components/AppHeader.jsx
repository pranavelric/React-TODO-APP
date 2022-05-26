import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';

export default function AppHeader() {
  const [modelOpen,setModalOpen] = useState(false);
  return (
      <div className={styles.app_header}>
    <Button variant='primary' onClick={()=>setModalOpen(true)}>AddTask</Button>
    <SelectButton>
        <option value="all">All</option>
        <option value="Complete">Complete</option>
        <option value="Incomplete">Incomplete</option>
    </SelectButton>
    <TodoModal  type='add' modelOpen={modelOpen} setModalOpen={setModalOpen}/>
  </div>
  )
}
