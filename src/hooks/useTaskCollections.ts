import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';
import { useLocalStorage } from 'usehooks-ts';

function useTaskCollection()
{
    return useLocalStorage('tasks',{
        Todo: [],
        'In Progress': [],
        Blocked: [],
        Completed: [],
    })
}

export default useTaskCollection;