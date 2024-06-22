import "./App.css";
import Nav from "./components/Nav";
import DateBar from "./components/DateBar";
//import Tabs from "./components/Tabs";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
    
      <DateBar />
      <Nav />
      <Home />
    </div>
  );
}

export default App;

