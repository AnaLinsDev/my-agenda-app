import "./App.css";
import Calendar from "./components/layout/Calendar";

import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen mx-8">
        <Navbar />
        <Calendar />
      </div>
    </>
  );
}

export default App;
