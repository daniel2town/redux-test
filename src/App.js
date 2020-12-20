import logo from "./logo.svg";
import "./App.css";
import Task from "./containers/Task";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Task />
      </header>
    </div>
  );
}

export default App;
