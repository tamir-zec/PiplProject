export function AnswerComponent(props) {
    return (
        <div>
            Email: {props.Email}
            Phone: {props.Phone}
            EmailProvider: {props.EmailProvider}
            PhoneCountry: {props.PhoneCountry}
        </div>
    );
}