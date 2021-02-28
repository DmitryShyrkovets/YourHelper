    let validation, h1, inputs, LoginEmail, LoginPassword;

    class Login extends React.Component {
        constructor(props) {
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onEmailChange = this.onEmailChange.bind(this);
            this.onPasswordChange = this.onPasswordChange.bind(this);
        }

        onEmailChange(e) {
            if(e.target.value === " "){
                e.target.value = "";
            }
            this.setState({ Email: e.target.value });
        }
        onPasswordChange(e) {
            if(e.target.value === " "){
                e.target.value = "";
            }
            this.setState({ Password: e.target.value });
        }

        componentDidMount() {
            validation = document.querySelector(".validation");
            h1 = document.querySelector(".login-form h1");
            inputs = document.querySelectorAll(".data-field input");
        }
        
        async handleSubmit(e) {
            e.preventDefault();

            try {
                LoginEmail = this.state.Email;
                LoginPassword = this.state.Password;
            }
            catch (error){
                LoginEmail = null;
                LoginPassword = null;
                h1.setAttribute("style", "margin: 40px 0 0 0");
                validation.innerHTML = 'Поля не должны быть пустыми';
                inputs.item(0).setAttribute("style", "border-color: red");
                inputs.item(1).setAttribute("style", "border-color: red")
                
                return;
            }
            
            let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if(LoginEmail === "" || LoginPassword === ""){
                h1.setAttribute("style", "margin: 40px 0 0 0");
                validation.innerHTML = 'Поля не должны быть пустыми';
                inputs.item(0).setAttribute("style", "border-color: red");
                inputs.item(1).setAttribute("style", "border-color: red");

                return;
            }
            
            if(!pattern .test(LoginEmail)){
                h1.setAttribute("style", "margin: 40px 0 0 0");
                validation.innerHTML = 'Почта введена неправильно';
                inputs.item(0).setAttribute("style", "border-color: red");
                inputs.item(1).setAttribute("style", "border-color: #415EED");

                return;
            }

            try {
                if(LoginPassword.length < 6){
                    h1.setAttribute("style", "margin: 40px 0 0 0");
                    validation.innerHTML = 'Пароль должен быть не меньше 6 символов';
                    inputs.item(1).setAttribute("style", "border-color: #415EED");
                    inputs.item(1).setAttribute("style", "border-color: red");

                    return;
                }
            }
            catch (error){
                validation.innerHTML = 'Пароль не должен быть пусты';
                inputs.item(1).setAttribute("style", "border-color: #415EED");
                inputs.item(1).setAttribute("style", "border-color: red");
                
                return
            }
            
            axios({
                method: 'post',
                url: '/Account/Login',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    Email: LoginEmail,
                    Password: LoginPassword
                }
            })
                .then(function (response) {
                    if (response.data.type === "ok") {
                        window.location.href =  response.data.redirectToUrl;
                    }
                    else {
                        h1.setAttribute("style", "margin: 40px 0 0 0");

                        validation.innerHTML = response.data.error;

                        inputs.item(0).setAttribute("style", "border-color: red");
                        inputs.item(1).setAttribute("style", "border-color: red");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        render() {
            return <form className="login-form" onSubmit={this.handleSubmit}>
                <h1>Авторизация</h1>
                <div className="validation"></div>
                <div className="data-field">
                    <input autoComplete="off" type="text" placeholder="Введите почту" onChange={this.onEmailChange} />
                </div>
                <div className="data-field">
                    <input autoComplete="off" type="password" placeholder="Введите пароль" onChange={this.onPasswordChange} />
                </div>
                <div className="link-area">
                    <a href="../Account/Recovery" className="recovery-link">Забыли данные?</a>
                </div>
                <div className="login-button">
                    <input type="submit" value="Войти" />
                </div>
                <div className="link-area">
                    <a className="register-link" href="../Account/Register">создать аккаунт</a>
                </div>
            </form>;
        }
    }
ReactDOM.render(
    <Login />,
    document.getElementById("login")
);