/*
 *
 * Task actions
 *
 */
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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createTask(data) {
  console.log("ACTION", data);
  return {
    type: CREATE_TASK,
    data,
  };
}

export function createTaskSuccess(response) {
  return {
    type: CREATE_TASK_SUCCESS,
    response,
  };
}

export function createTaskFailed(response) {
  return {
    type: CREATE_TASK_FAILED,
    response,
  };
}

export function updateTask(data) {
  return {
    type: UPDATE_TASK,
    data,
  };
}

export function updateTaskSuccess(response) {
  return {
    type: UPDATE_TASK_SUCCESS,
    response,
  };
}

export function updateTaskFailed(response) {
  return {
    type: UPDATE_TASK_FAILED,
    response,
  };
}

export function getTask(data) {
  return {
    type: GET_TASK,
    data,
  };
}

export function getTaskSuccess(response) {
  return {
    type: GET_TASK_SUCCESS,
    response,
  };
}

export function getTaskFailed(response) {
  return {
    type: GET_TASK_FAILED,
    response,
  };
}
