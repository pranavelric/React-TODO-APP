import React from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import { motion, useMotionValue, useTransform } from 'framer-motion';
const checkVariants = {
    initial:{
        color:'#fff',
    },
    checked:{
        pathLength:1,
    },
    unchecked:{
        pathLength:0
    }

};

const boxVariant = {
    checked:{
        background:'#646ff0',
        transition:{duration:0.1},
    },
    unchecked:{
        background:'#eee',
        transition:{duration:0.1},
    }

};

export default function CheckButton({checked,handleChecked}) {
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  
    return (
    <motion.div className={styles.svgBox}
    variants={boxVariant}
    animate={checked?'checked':'unchecked'}
    onClick={handleChecked}
    >
        <motion.svg className={styles.svg} viewBox="0 0 53 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                variants={checkVariants}
                animate={checked?'checked':'unchecked'}
                style={{ pathLength, opacity }}
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="6"
                d="M1.5 22L16 36.5L51.5 1"
                strokeLinejoin="round"
                strokeLinecap="round"
            ></motion.path>
        </motion.svg>
    </motion.div>
  )
}
