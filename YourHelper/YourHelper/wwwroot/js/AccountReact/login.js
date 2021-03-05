 
    class Login extends React.Component {
        constructor(props) {
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onEmailChange = this.onEmailChange.bind(this);
            this.onPasswordChange = this.onPasswordChange.bind(this);
            this.state = {
                email: '',
                password: '',
                message: '',
                errorEmail: '',
                errorPassword: '',
                error: ''
            }
        }

        onEmailChange(e) {
            if(e.target.value === " "){
                e.target.value = "";
            }
            
            this.setState({ email: e.target.value });
        }
        
        onPasswordChange(e) {
            if(e.target.value === " "){
                e.target.value = "";
            }
            
            this.setState({ password: e.target.value });
        }
        
        CheckInputs(){
            let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(this.state.email === "" || this.state.password === ""){
                this.setState({message: 'Поля не должны быть пустыми', 
                    errorEmail: 'error', 
                    errorPassword: 'error', 
                    error: 'error'})

                return false;
            }

            if(!pattern .test(this.state.email)){
                this.setState({message: 'Почта введена неправильно', 
                    errorEmail: 'error', 
                    errorPassword: '', 
                    error: 'error'})

                return false;
            }

            if(this.state.password.length < 6){
                this.setState({message: 'Пароль должен быть не меньше 6 символов', 
                    errorEmail: '', 
                    errorPassword: 'error', 
                    error: 'error'})

                return false;
            }
            
            return true;
        }
        
        async handleSubmit(e) {
            e.preventDefault();
            
            if(!this.CheckInputs()) {
                return;
            }
            
            let thisRef = this;
            
            axios({
                method: 'post',
                url: '/Account/Login',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    Email: this.state.email,
                    Password: this.state.password
                }
            })
                .then(function (response) {
                    if (response.data.type === "ok") {
                        window.location.href =  response.data.redirectToUrl;
                    }
                    else {
                        thisRef.setState({message: response.data.error, 
                            errorEmail: 'error', 
                            errorPassword: 'error', 
                            error: 'error'})
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        render() {
            return (<form className="login-form" onSubmit={this.handleSubmit}>
                <h1 className={this.state.error}>Авторизация</h1>
                <Validation message={this.state.message} />
                <div className="data-field">
                    <input className={this.state.errorEmail} autoComplete="off" type="text" placeholder="Введите почту" value={this.state.email} onChange={this.onEmailChange} />
                </div>
                <div className="data-field">
                    <input className={this.state.errorPassword} autoComplete="off" type="password" placeholder="Введите пароль" value={this.state.password} onChange={this.onPasswordChange} />
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
            </form>);
        }
    }
    
ReactDOM.render(
    <Login />,
    document.getElementById("login")
);