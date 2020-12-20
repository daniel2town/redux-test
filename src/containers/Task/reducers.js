/* eslint-disable default-case */
// Imports: Dependencies
import produce from "immer";

import {
  DEFAULT_ACTION,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILED,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  GET_TASK,
  GET_TASK_SUCCESS,
  GET_TASK_FAILED,
} from "./constants";

export const initialState = {
  taskData: null,
  creatingTaskSuccess: false,
  creatingTaskFailed: false,
  creatingTaskErrorMessage: "",
  updatingTaskSuccess: false,
  updatingTaskFailed: false,
  updatingTaskErrorMessage: "",
  gettingTaskSuccess: false,
  gettingTaskFailed: false,
  gettingTaskErrorMessage: "",
};

const taskReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    console.log("REDUCER", action.type);
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CREATE_TASK:
        draft.taskData = [];
        draft.creatingTaskSuccess = false;
        draft.creatingTaskFailed = false;
        draft.creatingTaskErrorMessage = "";
        break;
      case CREATE_TASK_SUCCESS:
        // console.log("REDUCER", action);
        draft.taskData = action;
        draft.creatingTaskSuccess = true;
        draft.creatingTaskFailed = false;
        draft.creatingTaskErrorMessage = "";
        break;
      case CREATE_TASK_FAILED:
        draft.taskData = [];
        draft.creatingTaskSuccess = false;
        draft.creatingTaskFailed = true;
        draft.creatingTaskErrorMessage = action.response.error;
        break;
      case UPDATE_TASK:
        draft.taskData = [];
        draft.updatingTaskSuccess = false;
        draft.updatingTaskFailed = false;
        draft.updatingTaskErrorMessage = "";
        break;
      case UPDATE_TASK_SUCCESS:
        draft.taskData = action.response;
        draft.updatingTaskSuccess = true;
        draft.updatingTaskFailed = false;
        draft.updatingTaskErrorMessage = "";
        break;
      case UPDATE_TASK_FAILED:
        draft.taskData = [];
        draft.updatingTaskSuccess = false;
        draft.updatingTaskFailed = true;
        draft.updatingTaskErrorMessage = action.response.error;
        break;
      case GET_TASK:
        draft.taskData = [];
        draft.gettingTaskSuccess = false;
        draft.gettingTaskFailed = false;
        draft.gettingTaskErrorMessage = "";
        break;
      case GET_TASK_SUCCESS:
        draft.taskData = action.response.data;
        draft.gettingTaskSuccess = true;
        draft.gettingTaskFailed = false;
        draft.gettingTaskErrorMessage = "";
        break;
      case GET_TASK_FAILED:
        draft.taskData = [];
        draft.gettingTaskSuccess = false;
        draft.gettingTaskFailed = true;
        draft.gettingTaskErrorMessage = action.response.error;
        break;
    }
  });

export default taskReducer;
