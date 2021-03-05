
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.state = {
            email: '',
            password: '',
            confirm: '',
            message: '',
            errorEmail: '',
            errorPassword: '',
            errorConfirm: '',
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

    onPasswordConfirmChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        
        this.setState({ confirm: e.target.value });
    }

    CheckInputs(){
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.email === "" || this.state.password === "" || this.state.confirm === ""){
            this.setState({message: 'Поля не должны быть пустыми', 
                errorEmail: 'error', 
                errorPassword: 'error', 
                errorConfirm: 'error', 
                error: 'error'})
            
            return false;
        }

        if(!pattern .test(this.state.email)){
            this.setState({message: 'Почта введена неправильно', 
                errorEmail: 'error', 
                errorPassword: '', 
                errorConfirm: '', 
                error: 'error'})
            
            return false;
        }


        if(this.state.password.length < 6){
            this.setState({message: 'Пароль должен быть не меньше 6 символов',
                errorEmail: '',
                errorPassword: 'error',
                errorConfirm: '',
                error: 'error'})

            return false;
        }

        if(this.state.password !== this.state.confirm){
            this.setState({message: 'Пароли должны совпадать',
                errorEmail: '',
                errorPassword: 'error',
                errorConfirm: 'error',
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
            url: '/Account/Register',
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
                        errorConfirm: 'error',
                        error: 'error'})

                    return false;
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (<form className="register-form" onSubmit={this.handleSubmit}>
            <div className="back" onClick={() => window.location.href = "../"}>
                <i className="arrow left"></i>
            </div>
            <h1 className={this.state.error}>Регистрация</h1>
            <Validation message={this.state.message} />
            <div>
                <div className="data-field">
                    <input className={this.state.errorEmail} type="text" placeholder="Введите почту" value={this.state.email} onChange={this.onEmailChange} />
                </div>
                <div className="data-field">
                    <input className={this.state.errorPassword} type="password" placeholder="Введите пароль" value={this.state.password} onChange={this.onPasswordChange} />
                </div>
                <div className="data-field">
                    <input className={this.state.errorConfirm} type="password" placeholder="Повторите пароль" value={this.state.confirm} onChange={this.onPasswordConfirmChange}/>
                </div>
                <div className="register-button">
                    <input type="submit" value="Создать" />
                </div>
            </div>
        </form>);
    }
}
ReactDOM.render(
    <Register />,
    document.getElementById("register")
);