

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.ShowChangePassword = this.ShowChangePassword.bind(this);
        this.HideChangePassword = this.HideChangePassword.bind(this);
        this.NotificationHide = this.NotificationHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            password: '',
            newPassword: '',
            confirm: '',
            error: '',
            errorPassword: '',
            errorNewPassword: '',
            errorConfirm: '',
            message: '',
            changeBody: 'hide',
            changeButton: '',
            content: '',
            notificationMessage: '',
            notification: '',
            email: ''
        }
    }

    onPasswordChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        this.setState({ password: e.target.value });
    }

    onNewPasswordChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        this.setState({ newPassword: e.target.value });
    }

    onPasswordConfirmChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        this.setState({ confirm: e.target.value });
    }

    CheckInputs(){
        if(this.state.password === "" || this.state.newPassword === "" || this.state.confirm === ""){
            this.setState({message: 'Поля не должны быть пустыми',
                errorPassword: 'error',
                errorNewPassword: 'error',
                errorConfirm: 'error',
                error: 'error'})

            return false
        }

        if(this.state.password.length < 6){
            this.setState({message: 'Пароль должен быть больше 5 символов',
                errorPassword: 'error',
                errorNewPassword: '',
                errorConfirm: '',
                error: 'error'})

            return false;
        }

        if(this.state.newPassword.length < 6){
            this.setState({message: 'Пароль должен быть больше 5 символов',
                errorPassword: '',
                errorNewPassword: 'error',
                errorConfirm: '',
                error: 'error'})

            return false;
        }

        if(this.state.confirm.length < 6){
            this.setState({message: 'Пароль должен быть больше 5 символов',
                errorPassword: '',
                errorNewPassword: '',
                errorConfirm: 'error',
                error: 'error'})

            return false;
        }

        if(this.state.newPassword !== this.state.confirm){
            this.setState({message: 'Пароли должны совпадать',
                errorPassword: '',
                errorNewPassword: 'error',
                errorConfirm: 'error',
                error: 'error'})

            return false;
        }

        return true;
    }
    
    ShowChangePassword(){
        this.setState({ changeButton: 'hide',
            content: 'active',
            changeBody: ''});
    }
    
    HideChangePassword(){
        this.setState({ changeButton: '',
        content: '',
        changeBody: 'hide',
        message: '',
        errorPassword: '',
        errorNewPassword: '',
        errorConfirm: '',
        error: '',
        password: '',
        newPassword: '',
        confirm: ''});
    }

    NotificationHide(){
        this.setState({notification: '', notificationMessage: ''});
    }
    
    handleSubmit(){

        if(!this.CheckInputs()) {
            return;
        }

        let thisRef = this;
        
        axios({
            method: 'post',
            url: '/Account/ChangePassword',
            headers: { 'Content-Type': 'application/json' },data: {
                Password: this.state.password,
                NewPassword: this.state.newPassword
            }
        })
            .then(function (response) {
                if (response.data.type === "ok") {

                    thisRef.setState({message: '',
                        errorPassword: '',
                        errorNewPassword: '',
                        errorConfirm: '',
                        error: ''})

                    thisRef.HideChangePassword();
                    thisRef.setState({notificationMessage: 'Пароль успешно изменён', notification: 'active'});
                }
                else {
                    thisRef.setState({message: 'Старый пароль не совпадает',
                        errorPassword: 'error',
                        errorNewPassword: '',
                        errorConfirm: '',
                        error: 'error'})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    componentDidMount() {
            let thisRef = this;
            axios({
                method: 'get',
                url: '/Account/GetEmail',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(function (response) {
                    console.log("error");
                    thisRef.setState({email: response.data.email})
                })
                .catch(function (error) {
                    console.log(error);
                });
    }
    
    render() {
        return (
            <div>
                <form className={"settings_content " + this.state.content}>
                    <div className={"account-data " + this.state.error}>
                        <h2>Аккаунт: &nbsp;</h2>
                        <h2 className="Email">{this.state.email}</h2>
                    </div>
                    <Validation message={this.state.message} />
                    <div className={"button-1 change " + this.state.changeButton} onClick={this.ShowChangePassword}>
                        <h3>Сменить пароль</h3>
                    </div>
                    <div className={"change_body " + this.state.changeBody}>
                        <div className="data-field">
                            <input className={this.state.errorPassword} type="password" placeholder="Введите старый пароль" value={this.state.password} onChange={this.onPasswordChange} />
                        </div>
                        <div className="data-field">
                            <input className={this.state.errorNewPassword} type="password" placeholder="Введите новый пароль" value={this.state.newPassword} onChange={this.onNewPasswordChange} />
                        </div>
                        <div className="data-field">
                            <input className={this.state.errorConfirm} type="password" placeholder="Повторите новый пароль" value={this.state.confirm} onChange={this.onPasswordConfirmChange}/>
                        </div>
                        <div className="buttons">
                            <div className="button-1 confirm" onClick={this.handleSubmit}>
                                <h3>Подтвердить</h3>
                            </div>
                            <div className="button-2 cancel" onClick={this.HideChangePassword}>
                                <h3>Отмена</h3>
                            </div>
                        </div>
                    </div>
                </form>
                <Notification message={this.state.notificationMessage} notification={this.state.notification} onHide={this.NotificationHide}/>
            </div>);
    }
}

ReactDOM.render(
    <Settings />,
    document.querySelector('.settings_body')
);