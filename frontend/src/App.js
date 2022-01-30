import React from "react";
import './App.css';
import {AdvancedForm} from './advanced_form';
import {SimpleForm} from './simple_form';

function App() {
    const [state, setState] = React.useState({simpleForm: true})

    return (
        <div className="App">
                <button onClick={handleSimple}> Simple Mode </button>
                <button onClick={handleAdvanced}> Advanced Mode </button>
                <b> {state.simpleForm === true? <SimpleForm /> : <AdvancedForm/>} </b>
        </div>
    );
    function handleSimple(){setState(SimpleForm = true)}
    function handleAdvanced(){setState(SimpleForm = false)}
}

export default App;
