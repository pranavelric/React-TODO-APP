import React from 'react'
import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';


const buttonTypes = {
    primary:'primary',
    secondary:'secondary'
}

export default function Button({children,type, variant='primary',...rest}) {
  return <button type={type==='submit'?'submit':'button'} {...rest} 
  className={getClasses([styles.button,styles[`button--${buttonTypes[variant]}`]])}>{children}</button>  
}


function SelectButton({children,...rest}){
    return(
    <select className={getClasses([styles.button,styles.button_select])} {...rest}>{children}</select>
    );
}

export {SelectButton};