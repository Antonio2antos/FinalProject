import { URL } from './constants'

const createTask = () => `${URL}/tasks/create`
const readTask = (taskId) => `${URL}/tasks/${taskId}`
const updateTask = (taskId) => `${URL}/tasks/${taskId}/update`
const deleteTask = (taskId) => `${URL}/tasks/${taskId}`

export {
    createTask, 
    readTask,
    updateTask,
    deleteTask
}