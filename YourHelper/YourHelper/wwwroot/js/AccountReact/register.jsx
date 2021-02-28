let validation, h1, inputs, RegisterEmail, RegisterPassword, ConfirmPassword;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.back = this.back.bind(this);
    }
    
    back() {
        window.location.href = "../";
    }
    
    onEmailChange(e) {
        this.setState({ Email: e.target.value });
    }
    
    onPasswordChange(e) {
        this.setState({ Password: e.target.value });
    }

    onPasswordConfirmChange(e) {
        this.setState({ ConfirmPassword: e.target.value });
    }

    componentDidMount() {
        validation = document.querySelector(".validation");
        h1 = document.querySelector(".register-form h1");
        inputs = document.querySelectorAll(".data-field input");
    }
    
    async handleSubmit(e) {
        e.preventDefault();

        try {
            RegisterEmail = this.state.Email;
            RegisterPassword = this.state.Password;
            ConfirmPassword = this.state.ConfirmPassword;
        }
        catch (error){
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Поля не должны быть пустыми';
            inputs.item(0).setAttribute("style", "border-color: red");
            inputs.item(1).setAttribute("style", "border-color: red")
            inputs.item(2).setAttribute("style", "border-color: red")

            return;
        }

        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(RegisterEmail === "" || RegisterPassword === "" || ConfirmPassword === ""){
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Поля не должны быть пустыми';
            inputs.item(0).setAttribute("style", "border-color: red");
            inputs.item(1).setAttribute("style", "border-color: red");
            inputs.item(2).setAttribute("style", "border-color: red");

            return;
        }

        if(!pattern .test(RegisterEmail)){
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Почта введена неправильно';
            inputs.item(0).setAttribute("style", "border-color: red");
            inputs.item(1).setAttribute("style", "border-color: #415EED");
            inputs.item(2).setAttribute("style", "border-color: #415EED");

            return;
        }

        try {
            if(RegisterPassword.length < 6){
                h1.setAttribute("style", "margin: 10px 0 0 0");
                validation.innerHTML = 'Пароль должен быть не меньше 6 символов';
                inputs.item(1).setAttribute("style", "border-color: #415EED");
                inputs.item(1).setAttribute("style", "border-color: red");
                inputs.item(2).setAttribute("style", "border-color: red");

                return;
            }
        }
        catch (error) {
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Пароли не должены быть пустыми';
            inputs.item(1).setAttribute("style", "border-color: #415EED");
            inputs.item(1).setAttribute("style", "border-color: red");
            inputs.item(2).setAttribute("style", "border-color: red");

            return;
        }

        if(RegisterPassword !== ConfirmPassword){
            h1.setAttribute("style", "margin: 10px 0 0 0");
            validation.innerHTML = 'Пароли должны совпадать';
            inputs.item(1).setAttribute("style", "border-color: #415EED");
            inputs.item(1).setAttribute("style", "border-color: red");
            inputs.item(2).setAttribute("style", "border-color: red");

            return;
        }
        
        axios({
            method: 'post',
            url: '/Account/Register',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: RegisterEmail,
                Password: RegisterPassword
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
                    inputs.item(1).setAttribute("style", "border-color: red");
                    inputs.item(2).setAttribute("style", "border-color: red");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return <form className="register-form" onSubmit={this.handleSubmit}>
            <div className="back" onClick={this.back}>
                <i className="arrow left"></i>
            </div>
            <h1>Регистрация</h1>
            <div className="validation"></div>
            <div>
                <div className="data-field">
                    <input  type="text" placeholder="Введите почту" onChange={this.onEmailChange} />
                </div>
                <div className="data-field">
                    <input type="password" placeholder="Введите пароль" onChange={this.onPasswordChange} />
                </div>
                <div className="data-field">
                    <input type="password" placeholder="Повторите пароль" onChange={this.onPasswordConfirmChange}/>
                </div>
                <div className="register-button">
                    <input type="submit" value="Создать" />
                </div>
            </div>
        </form>
    }
}
ReactDOM.render(
    <Register />,
    document.getElementById("register")
);