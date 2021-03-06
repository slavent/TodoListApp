import {
    ON_CANCEL_TIMER, ON_CLEAR_ADDING_FORM, DISABLE_LOADING, ENABLE_LOADING,
    ON_FINISH_TASK,
    GET_TASKS, ON_INPUT_ESTIMATE, ON_INPUT_PRIORITY, ON_INPUT_TITLE,
    ON_START_TASK,
    ON_TOGGLE_COMMENT_FORM, ON_TOGGLE_COMMENTS,
    ON_UPDATE_TASK, SET_CURRENT_TASK, ON_INPUT_DESCRIPTION
} from "constants/actions"
import PRIORITIES from "constants/priorities"

export const initialState = {
    tasks: [],
    timerIsOn: false,
    startedTaskId: null,
    isLoading: true,
    isShowComments: false,
    currentTask: null,
    newTask: {
        title: "",
        description: "",
        estimate: 1,
        priority: PRIORITIES.MINOR
    }
}

export default ( state = initialState, { type, payload } ) => {
    switch ( type ) {
        case GET_TASKS:
            return {
                ...state,
                tasks: payload
            }

        case SET_CURRENT_TASK:
            return {
                ...state,
                currentTask: payload
            }

        case ON_FINISH_TASK:
            return {
                ...state,
                timerIsOn: false,
                startedTaskId: null
            }

        case ON_START_TASK:
            return {
                ...state,
                timerIsOn: true,
                startedTaskId: payload
            }

        case ON_CANCEL_TIMER:
            return {
                ...state,
                timerIsOn: false,
                startedTaskId: null
            }

        case ON_UPDATE_TASK: {
            const { tasks } = state

            const newTasks = tasks.map( task => {
                if ( task._id === payload._id ) {
                    task = payload
                }

                return task
            } )

            return {
                ...state,
                tasks: newTasks
            }
        }

        case ON_TOGGLE_COMMENT_FORM: {
            const { tasks } = state
            const newTasks = tasks.map( task => {
                if ( task._id === payload ) {
                    task.isAddComment = !task.isAddComment
                }

                return task
            } )

            return {
                ...state,
                tasks: newTasks
            }
        }

        case ON_TOGGLE_COMMENTS:
            return {
                ...state,
                isShowComments: !state.isShowComments
            }

        case ON_INPUT_TITLE:
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    title: payload
                }
            }

        case ON_INPUT_DESCRIPTION:
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    description: payload
                }
            }

        case ON_INPUT_ESTIMATE:
            return {
                ...state,
                estimate: {
                    ...state.newTask,
                    title: payload
                }
            }

        case ON_INPUT_PRIORITY:
            return {
                ...state,
                priority: {
                    ...state.newTask,
                    title: payload
                }
            }

        case ON_CLEAR_ADDING_FORM:
            return {
                ...state,
                newTask: {
                    ...initialState.newTask
                }
            }

        case DISABLE_LOADING:
            return {
                ...state,
                isLoading: false
            }

        case ENABLE_LOADING:
            return {
                ...state,
                isLoading: true
            }

        default:
            return state
    }
}
