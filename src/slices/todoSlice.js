import { createSlice } from "@reduxjs/toolkit";

const getInitialTodos=()=>{
    const localTodoList = window.localStorage.getItem('todoList');
    if(localTodoList){
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todoList',JSON.stringify([]));
    return [];
};

const initialValue= {
    todoList: getInitialTodos(),
};

export const todoSlice = createSlice({
    name:'todo',
    initialState: initialValue,
    reducers:{
        addTodo:(state,action)=>{
            state.todoList.push(action.payload);
            const todoList= window.localStorage.getItem('todoList');
            if (todoList){
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    ...action.payload
                });
                window.localStorage.setItem('todoList',JSON.stringify(todoListArr));
            }else{
                window.localStorage.setItem('todoList',JSON.stringify([{...action.payload}]));
            }
        },
        
        deleteTodo:(state,action)=>{
            const todoList = window.localStorage.getItem('todoList');
            if(todoList){
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((element,index) => {
                    if(element.id===action.payload){
                        todoListArr.splice(index,1);
                    }
                });
                window.localStorage.setItem('todoList',JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateTodo:(state,action)=>{
            const todoList = window.localStorage.getItem('todoList');
            if(todoList){
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((element,index) => {
                    if(element.id===action.payload){
                        element.status = action.payload.status;
                        element.title = action.payload.title;
                    }
                });
                window.localStorage.setItem('todoList',JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        }
    }
});

export const {addTodo, deleteTodo,updateTodo}= todoSlice.actions;
export default todoSlice.reducer;