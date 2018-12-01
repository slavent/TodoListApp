import TYPES from "constants/actions"
import axios from "axios"
import { remove } from "lodash"
import STATUSES from "constants/statuses"

const API_PATH = "/api/tasks"

export const getTasks = () => dispatch => {
    axios.get( API_PATH ).then( ( { data } ) => {
        dispatch( {
            type: TYPES.GET_TASKS,
            payload: data
        } )
    } )
}

export const createTask = () => ( dispatch, getState ) => {
    const { title, estimate } = getState()

    axios.post( API_PATH, {
        title,
        estimate
    } ).then( ( { data } ) => {
        dispatch( {
            type: TYPES.CREATE_TASK,
            payload: data
        } )
    } ).catch( error => console.error( error ) )
}

export const deleteTask = id => dispatch => {
    axios.delete( API_PATH + "/" + id ).then( () => {
        dispatch( {
            type: TYPES.DELETE_TASK,
            payload: id
        } )
    } ).catch( error => console.error( error ) )

}
export const finishTask = () => ( dispatch, getState ) => {
    const { startedTaskId, tasks } = getState()

    tasks.forEach( task => {
        if ( task._id === startedTaskId ) {
            task.estimate = task.estimate - 1

            if ( task.estimate === 0 ) {
                task.status = STATUSES.DONE
            }

            dispatch( updateTask( task ) )
        }
    } )
}

export const startTask = taskId => dispatch => dispatch( {
    type: TYPES.START_TASK,
    payload: taskId
} )

export const cancelTimer = () => dispatch => dispatch( {
    type: TYPES.CANCEL_TIMER
} )

export const updateTask = task => dispatch => {
    axios.put( API_PATH + "/" + task._id, task ).then( () => {
        dispatch( {
            type: TYPES.UPDATE_TASK,
            payload: task
        } )
    } ).catch( error => console.error( error ) )
}

export const updateTaskStatus = id => ( dispatch, getState ) => {
    const { tasks } = getState()
    const task = tasks.find( task => task._id === id )
    const isDone = task.status === STATUSES.DONE

    task.status = isDone ? STATUSES.TODO : STATUSES.DONE

    dispatch( updateTask( task ) )
}

export const addComment = taskId => dispatch => {
    axios.post( `/api/comments`, { text: "some text" } ).then( ( { data } ) => {
        axios.put( API_PATH + "/" + taskId, { comments: [ data._id ] } )
    } ).catch( error => console.error( error ) )

    dispatch( toggleCommentForm( taskId ) )
}

export const toggleCommentForm = taskId => dispatch => dispatch( {
    type: TYPES.TOGGLE_COMMENT_FORM,
    payload: taskId
} )

export const toggleComments = () => dispatch => dispatch( {
    type: TYPES.TOGGLE_COMMENTS
} )

export const inputTaskTitle = title => dispatch => dispatch( {
    type: TYPES.INPUT_TASK_TITLE,
    payload: title
} )

export const inputTaskEstimate = estimate => dispatch => dispatch( {
    type: TYPES.INPUT_TASK_TITLE,
    payload: estimate
} )

export const inputTaskPriority = priority => dispatch => dispatch( {
    type: TYPES.INPUT_TASK_PRIORITY,
    payload: priority
} )

