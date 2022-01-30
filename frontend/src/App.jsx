import React from "react";
import './App.css';
import { AdvancedForm } from './advanced_form';
import { SimpleForm } from './SimpleForm';

function App() {
    const [isSimpleForm, setIsSimpleForm] = React.useState(undefined);
    let FormToRender = undefined;
    if (typeof isSimpleForm === 'boolean') {
        // FormToRender = isSimpleForm ? SimpleForm : AdvancedForm;
    }
    return (
        <div className="App">
            <button onClick={() => setIsSimpleForm(true)}> Simple Mode </button>
            <button onClick={() => setIsSimpleForm(false)}> Advanced Mode </button>
            { FormToRender && <FormToRender /> }
        </div>
    );
}

export default App;
