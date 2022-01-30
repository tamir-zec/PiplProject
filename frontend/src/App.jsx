import React, {useState} from "react";
import './App.css';
import {MainForm} from "./MainForm";

function App() {
    const [simpleForm, setSimpleForm] = useState(false);
    return (
        <div className="App">
            <button onClick={() => setSimpleForm(true)}> Simple Mode </button>
            <button onClick={() => setSimpleForm(false)}> Advanced Mode </button>
            <MainForm {simpleForm}/>
        </div>
    );
}

export default App;
