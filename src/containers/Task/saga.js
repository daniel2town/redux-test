// Imports: Dependencies
import { call, takeLatest, put, all } from "redux-saga/effects";

import { CREATE_TASK } from "./constants";
import { createTaskSuccess, createTaskFailed } from "./actions";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg0NjM1MDIsIm5iZiI6MTYwODQ2MzUwMiwianRpIjoiYWE3YWVkNTMtYTVhNS00Zjc3LWE1M2MtOTJjNjg0N2MzM2Q3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBUZXN0aW5nIiwiZW1haWwiOiJzcGljZWJsdWV0ZXN0MUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl8yZTYyOTc1NzFmY2I0ZTA3YWU3MjRlZjVhODJhMjM1MyIsImNvbXBhbnlfaWQiOiJjb21wYW55XzMzZTU0MmIzNWNiYTRkZTA5MjBjNTBiZWRhMDg3OTMwIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9hZGU1MjA3ZDViNDJjNWRhNTk1ZWRkNzgxODlkNzcxNz9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGaGVsbG9tYWlsLWltYWdlcy5zMy1hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tJTJGc2xvb3ZpJTJGaW1hZ2VzJTJGYXZhdGFyLWRlZmF1bHQtaWNvbi5wbmciLCJieV9kZWZhdWx0Ijoib3V0cmVhY2gifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.r5cv60DwQ87oA0qOk-rOpe6PbAv8eMpFr0cSeODS3XM";

export function* createTaskSaga(data) {
  console.log("SAGA", data);
  const requestURL =
    "https://stage.api.sloovi.com/task/lead_59a79b6cb211449f9698bad058a593e4";
  const headers = {
    method: "POST",

    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: data,
  };
  try {
    const response = yield call(requestURL, headers);
    yield put(createTaskSuccess(response));
  } catch (err) {
    yield put(createTaskFailed(JSON.parse(yield err.response.text())));
  }
}

export function* watchAllSaga() {
  yield takeLatest(CREATE_TASK, createTaskSaga);
}

export default function* taskSaga() {
  yield all([watchAllSaga()]);
}
