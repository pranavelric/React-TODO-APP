import React from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';

export default function AppHeader() {
  return (
      <div className={styles.app_header}>
    <Button variant='primary'>AddTask</Button>
    <SelectButton>
        <option value="all">All</option>
        <option value="Complete">Complete</option>
        <option value="Incomplete">Incomplete</option>
        
    </SelectButton>
    
  </div>
  )
}
