import {QueryComponent} from './query_component';
import {AnswerComponent} from './answer_compoment';
import React from "react";

export function AdvancedForm() {
    const [state, setState] = React.useState({
        PeopleList : [],
        AnswerList : [],
        validSubmit: false
    })

    return (
        <div>
            <button onClick={handleAdd}> + </button>
            <button onClick={handleSubtract}> - </button>
            <div>
                {state.PeopleList}
            </div>
            <div>
                {state.AnswerList}
            </div>
            <button onClick={handleSubmit} disabled={state.validSubmit}>Submit
            </button>
        </div>
    );

 /* this function will check if Submit button should be enabled
    function checkSubmit() {
        let checkSubmit = true
        for(const inputComp of state.PeopleList){
            // i want to somehow check for each input form in people list if the input is valid
            checkSubmit = checkSubmit && false
        }
    }
*/
    function handleAdd() {
        setState({...state, PeopleList: state.PeopleList.concat(<QueryComponent/>)})
    }

    function handleSubtract() {
        setState({...state, PeopleList: state.PeopleList.slice(0,-1)})
    }

    function handleResponse(res, people_list) {
        const answer_list = JSON.parse(res.data)
        const combined = people_list.map(function(e, i) {
            return [e, answer_list[i]]});
        const answers =combined.map(person_data => <AnswerComponent Email={person_data[0]["Email"]} Phone={person_data[0]["Phone"]} EmailProvider={person_data[1]["email_provider"]} PhoneCountry={person_data[1]["phone_country"]}/>)
        setState({state, AnswerList: answers})
    }

    function handleSubmit() {
        // I aspire to make people list a dictionary of dictionaries. where each dictionary value is a dictionary itself
        let people_list = state.PeopleList.values();
        let data = {"people_list": people_list}
        fetch('/api/advanced_request',{
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                }
            }).then(res => handleResponse(res, people_list)).then()
    }

}

