import React from "react";
import {QueryComponent} from './query_component';
import {AnswerComponent} from './answer_compomemt';

function SimpleForm() {
    const [state, setState] = React.useState({

    })

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    return (
        <form>
            <div>
                <QueryComponent/>
            </div>
        </form>
    );
}
