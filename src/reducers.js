// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import taskReducer from "./containers/Task/reducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  task: taskReducer,
});
// Exports
export default rootReducer;
