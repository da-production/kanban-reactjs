import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';
import useTaskCollection from './useTaskCollections';
import { pickChakraRandomColor } from '../utils/helpers';

const MAX_TASK_PER_COLUMN = 100;

export default function useColumnTasks(column)
{
    const [tasks, setTasks]      = useTaskCollection();

    const addEmptyTask = useCallback(()=>{
        console.log(`Adding new empty task to ${column} column`);
        setTasks((allTasks)=>{
            const columnTasks = allTasks[column];
            if(columnTasks.length > MAX_TASK_PER_COLUMN){
                console.log(`Too many task!`);
                return allTasks;
            }

            const newColumnTask = {
                id: uuidv4(),
                title: `New ${column} task`,
                color: pickChakraRandomColor('.300'),
                column,
            }

            return {
                ...allTasks,
                [column]:[newColumnTask,...columnTasks]
            }

        })
    },[column, setTasks]);

    const updateTask = useCallback((id,updatedTask)=>{
        console.log('updated task')
        setTasks((allTasks)=>{
            const columnTasks = allTasks[column];
            return {
                ...allTasks,
                [column]: columnTasks.map(task=> task.id === id ? {...task,...updatedTask}: task),
            }
        })

    },[column, setTasks]);

    const deleteTask = useCallback(id=>{
        console.log('removed task')
        setTasks(allTasks=>{
            const columnTasks = allTasks[column];
            return {
                ...allTasks,
                [column]: columnTasks.filter(task => task.id !== id)
            }
        })
    },[column, setTasks])

    return {
        tasks:tasks[column],
        addEmptyTask,
        updateTask,
        deleteTask
    }
}