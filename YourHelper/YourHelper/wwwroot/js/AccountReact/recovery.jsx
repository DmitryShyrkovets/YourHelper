let RecoveryEmail, validation, h1, inputs;

class Recovery extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.back = this.back.bind(this);
    }

    back() {
        window.location.href = "../";
    }
    
    onEmailChange(e) {
        this.setState({ Email: e.target.value });
    }

    componentDidMount() {
        validation = document.querySelector(".validation");
        h1 = document.querySelector(".recovery-form h1");
        inputs = document.querySelectorAll(".data-field input");
    }
    
    async handleSubmit(e) {
        e.preventDefault();

        try {
            RecoveryEmail = this.state.Email;

        }
        catch (error){
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Поле не должны быть пустыми';
            inputs.item(0).setAttribute("style", "border-color: red");

            return;
        }

        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(RecoveryEmail === ""){
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Поле не должны быть пустыми';
            inputs.item(0).setAttribute("style", "border-color: red");

            return;
        }

        if(!pattern .test(RecoveryEmail)){
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Почта введена неправильно';
            inputs.item(0).setAttribute("style", "border-color: red");

            return;
        }
        
        axios({
            method: 'post',
            url: '/Account/Recovery',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: RecoveryEmail,
            }
        })
            .then(function (response) {
                if (response.data.type === "ok") {
                    window.location.href =  response.data.redirectToUrl;
                }
                else {
                    h1.setAttribute("style", "margin: 10px 0 0 0");
                    
                    validation.innerHTML = response.data.error;

                    inputs.item(0).setAttribute("style", "border-color: red");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return <form className="recovery-form" onSubmit={this.handleSubmit}>
                        <div className="back" onClick={this.back}>
                            <i className="arrow left"></i>
                        </div>
                        <h1>Восстановление данных</h1>
                        <div className="validation"></div>
                        <div className="data-field">
                            <input autoComplete="off" type="text" placeholder="Введите почту" onChange={this.onEmailChange} />
                        </div>
                        <div className="recovery-button">
                                <input type="submit" value="Отправить" />
                        </div>
                </form>;
    }
}

ReactDOM.render(
    <Recovery />,
    document.getElementById("recovery")
);