
const { useState, useEffect } = React

function Recovery(props) {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    function onEmailChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }

        setEmail(e.target.value);
    }

    function CheckInputs(){
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(email === ""){
            setMessage('Поля не должны быть пустыми');
            setErrorEmail('error');
            setError('error');

            return false;
        }

        if(!pattern .test(email)){
            setMessage('Почта введена неправильно');
            setErrorEmail('error');
            setError('error');

            return false;
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();


        if(!CheckInputs()) {
            return;
        }
        
        axios({
            method: 'post',
            url: '/Account/Recovery',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: email,
            }
        })
            .then(function (response) {
                if (response.data.type === "ok") {
                    window.location.href =  response.data.redirectToUrl;
                }
                else {
                    setMessage(response.data.error);
                    setErrorEmail('error');
                    setError('error');

                    return false
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (<form className="recovery-form" onSubmit={e => handleSubmit(e)}>
        <div className="back" onClick={() => window.location.href = "../"}>
            <i className="arrow left"></i>
        </div>
        <h1 className={error}>Восстановление данных</h1>
        <Validation message={message} />
        <div className="data-field">
            <input className={errorEmail} autoComplete="off" type="text" placeholder="Введите почту" value={email} onChange={value => onEmailChange(value)} />
        </div>
        <div className="recovery-button">
            <input type="submit" value="Отправить" />
        </div>
    </form>);

}

ReactDOM.render(
    <Recovery />,
    document.getElementById("recovery")
);