import React from "react";
import { QueryComponent } from './query_component';
import { AnswerComponent } from './answer_compoment';

const validatePhone = (phone) => true;
const validateEmail = (email) => true;

export function SimpleForm() {
    const [state, setState] = React.useState({
        Person: QueryComponent,
        Answer: AnswerComponent,
        validSubmit: false
    })

    return (
        <form>
            <div>
                {state.Person}
                <button onClick={handleSubmit} disabled={state.validSubmit}>Submit
                </button>
            </div>
        </form>
    );

    function handleResponse(res, person_data) {
        const res_out = JSON.parse(res.data);
        // I want to take somehow the email and the phone from the query comp
        const answer = <AnswerComponent Email={person_data["Email"]} Phone={person_data["Phone"]} EmailProvider={res_out["email_provider"]} PhoneCountry={res_out["phone_country"]} />;
        setState({ state, AnswerList: answer });
    }


    function handleSubmit() {
        // somehow I need to take mail from the query component I initialized here
        let person_data = { "email": -1, "phone": -1 }
        fetch('/api/simple_request', {
            body: JSON.stringify(person_data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => handleResponse(res, person_data)).then()
    }
}
