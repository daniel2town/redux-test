// Imports: Dependencies
import { all, fork } from "redux-saga/effects";
import taskSaga from "./containers/Task/saga";

// Redux Saga: Root Saga
export default function* rootSaga() {
  yield all([fork(taskSaga)]);
}
