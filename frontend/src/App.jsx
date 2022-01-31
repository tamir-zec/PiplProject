import React, {useState} from "react";
import './App.css';
import {MainForm} from "./MainForm";

function App() {
    const [simpleForm, setSimpleForm] = useState(false);
    return (
        <div className="App">
            <button disabled={simpleForm} onClick={() => setSimpleForm(true)}> Simple Mode </button>
            <button disabled={!simpleForm} onClick={() => setSimpleForm(false)}> Advanced Mode </button>
            <MainForm isSimpleForm={simpleForm}/>
        </div>
    );
}

export default App;
