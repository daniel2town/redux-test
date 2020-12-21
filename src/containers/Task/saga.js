// Imports: Dependencies
import { call, takeEvery, put, all } from "redux-saga/effects";
import request from "../../utils/request";

import { CREATE_TASK, GET_TASK, UPDATE_TASK, DELETE_TASK } from "./constants";
import {
  createTaskSuccess,
  createTaskFailed,
  getTaskSuccess,
  getTaskFailed,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskSuccess,
  deleteTaskFailed,
} from "./actions";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg1MTczNTQsIm5iZiI6MTYwODUxNzM1NCwianRpIjoiMGQ4NWZiNDItYzJhMy00YzZlLTk5ZjMtZTA0MTU4MDlmNjY3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBUZXN0aW5nIiwiZW1haWwiOiJzcGljZWJsdWV0ZXN0MUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl8yZTYyOTc1NzFmY2I0ZTA3YWU3MjRlZjVhODJhMjM1MyIsImNvbXBhbnlfaWQiOiJjb21wYW55XzMzZTU0MmIzNWNiYTRkZTA5MjBjNTBiZWRhMDg3OTMwIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9hZGU1MjA3ZDViNDJjNWRhNTk1ZWRkNzgxODlkNzcxNz9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGaGVsbG9tYWlsLWltYWdlcy5zMy1hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tJTJGc2xvb3ZpJTJGaW1hZ2VzJTJGYXZhdGFyLWRlZmF1bHQtaWNvbi5wbmciLCJieV9kZWZhdWx0Ijoib3V0cmVhY2gifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.8TMxUCVN1bltD2nSEONIB5r4_laOxFlgEKAGSUleaYI";

export function* createTaskSaga(data) {
  const requestURL =
    "https://stage.api.sloovi.com/task/lead_59a79b6cb211449f9698bad058a593e4";
  const headers = {
    method: "POST",

    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data.data),
  };

  try {
    const response = yield call(request, requestURL, headers);
    yield put(createTaskSuccess(response));
    yield getTaskSaga();
  } catch (err) {
    yield put(createTaskFailed(JSON.parse(yield err.response.text())));
  }
}

export function* updateTaskSaga(data, id) {
  const requestURL = `https://stage.api.sloovi.com/task/lead_59a79b6cb211449f9698bad058a593e4/${data.id}`;
  const headers = {
    method: "PUT",

    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data.data),
  };

  try {
    const response = yield call(request, requestURL, headers);
    yield put(updateTaskSuccess(response));
    yield getTaskSaga();
  } catch (err) {
    console.log(err);
    yield put(updateTaskFailed(JSON.parse(yield err.response.text())));
  }
}

export function* getTaskSaga() {
  const requestURL =
    "https://stage.api.sloovi.com/task/lead_59a79b6cb211449f9698bad058a593e4";
  const headers = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = yield call(request, requestURL, headers);
    yield put(getTaskSuccess(response));
  } catch (err) {
    yield put(getTaskFailed(JSON.parse(yield err.response.text())));
  }
}

export function* deleteTaskSaga(data) {
  const requestURL = `https://stage.api.sloovi.com/task/lead_59a79b6cb211449f9698bad058a593e4/${data.data}`;
  const headers = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = yield call(request, requestURL, headers);
    yield put(deleteTaskSuccess(response));
    yield getTaskSaga();
  } catch (err) {
    yield put(deleteTaskFailed(JSON.parse(yield err.response.text())));
  }
}

export function* watchAllSaga() {
  yield takeEvery(CREATE_TASK, createTaskSaga);
  yield takeEvery(UPDATE_TASK, updateTaskSaga);
  yield takeEvery(GET_TASK, getTaskSaga);
  yield takeEvery(DELETE_TASK, deleteTaskSaga);
}

export default function* taskSaga() {
  yield all([watchAllSaga()]);
}
