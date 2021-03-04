let validation, inputs, accEmail, notificationBody, notificationText;

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.onPassword = this.onPassword.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            password: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    onPassword(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        this.setState({ password: e.target.value });
    }
    
    onPasswordChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        this.setState({ newPassword: e.target.value });
    }

    onPasswordConfirmChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        this.setState({ confirmPassword: e.target.value });
    }

    handleSubmit(e){
        let password = this.state.password;
        let newPassword = this.state.newPassword;
        let confirmPassword = this.state.confirmPassword;

        if(password === "" || newPassword === "" || confirmPassword === ""){
            accEmail.setAttribute("style", "margin: 30px 20px 0px 20px");
            validation.innerHTML = 'Поля не должны быть пустыми';
            inputs.item(0).setAttribute("style", "border-color: red");
            inputs.item(1).setAttribute("style", "border-color: red");
            inputs.item(2).setAttribute("style", "border-color: red");

            return;
        }

        if(password.length < 6){
            accEmail.setAttribute("style", "margin: 30px 20px 0px 20px");
            validation.innerHTML = 'Пароль должен быть больше 5 символов ';
            inputs.item(0).setAttribute("style", "border-color: red");
            inputs.item(1).setAttribute("style", "border-color: #415EED");
            inputs.item(2).setAttribute("style", "border-color: #415EED");

            return;
        }

        if(newPassword.length < 6){
            accEmail.setAttribute("style", "margin: 30px 20px 0px 20px");
            validation.innerHTML = 'Пароль должен быть больше 5 символов ';
            inputs.item(1).setAttribute("style", "border-color: red");
            inputs.item(0).setAttribute("style", "border-color: #415EED");
            inputs.item(2).setAttribute("style", "border-color: #415EED");

            return;
        }

        if(confirmPassword.length < 6){
            accEmail.setAttribute("style", "margin: 30px 20px 0px 20px");
            validation.innerHTML = 'Пароль должен быть больше 5 символов ';
            inputs.item(2).setAttribute("style", "border-color: red");
            inputs.item(1).setAttribute("style", "border-color: #415EED");
            inputs.item(0).setAttribute("style", "border-color: #415EED");

            return;
        }

        if(newPassword !== confirmPassword){
            accEmail.setAttribute("style", "margin: 30px 20px 0px 20px");
            validation.innerHTML = 'Пароли должны совпадать';
            inputs.item(1).setAttribute("style", "border-color: #415EED");
            inputs.item(1).setAttribute("style", "border-color: red");
            inputs.item(2).setAttribute("style", "border-color: red");

            return;
        }
        
        axios({
            method: 'post',
            url: '/Account/ChangePassword',
            headers: { 'Content-Type': 'application/json' },data: {
                Password: password,
                NewPassword: newPassword
            }
        })
            .then(function (response) {
                if (response.data.type === "ok") {

                    accEmail.setAttribute("style", "margin: 30px 20px 30px 20px");
                    validation.innerHTML = '';
                    inputs.item(0).setAttribute("style", "border-color: #415EED");
                    inputs.item(1).setAttribute("style", "border-color:  #415EED");
                    inputs.item(2).setAttribute("style", "border-color:  #415EED");
                    
                    $('.settings_content').toggleClass('active');
                    $('.change_body, .change').toggleClass('hide');
                    $('.data-field input').val("");
                    notificationText.html("Пароль успешно изменён");
                    notification.toggleClass('active');
                    
                }
                else {
                    accEmail.setAttribute("style", "margin: 30px 20px 0px 20px");
                    validation.innerHTML = 'Старый пароль не совпадает';
                    inputs.item(0).setAttribute("style", "border-color: red");
                    inputs.item(1).setAttribute("style", "border-color: #415EED");
                    inputs.item(2).setAttribute("style", "border-color: #415EED");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    componentDidMount() {
        $(document).ready(function(){
            axios({
                method: 'get',
                url: '/Account/GetEmail',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(function (response) {
                    $('.Email').html(response.data.email);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            validation = document.querySelector(".validation");
            accEmail = document.querySelector(".account-data");
            inputs = document.querySelectorAll(".data-field input");
            notificationBody = $('.notification');
            notificationText = $('.notification .notification_content .body');

            $('.change').click(function () {
                $('.settings_content').toggleClass('active');
                $('.change_body, .change').toggleClass('hide');
            });

            $('.cancel').click(function () {
                $('.settings_content').toggleClass('active');
                $('.change_body, .change').toggleClass('hide');
                $('.data-field input').val("");
            });
        });
    }
    
    render() {
        return <div className={"settings_content "}>
            <div className="account-data">
                <h2>Аккаунт: &nbsp;</h2>
                <h2 className="Email"></h2> 
            </div>
            <div className="validation"></div>
            <div className={"button-1 change "} onClick={this.AddClass}>
                <h3>Сменить пароль</h3>
            </div>
            <div className={"change_body hide"}>
                <div className="data-field">
                    <input type="password" placeholder="Введите старый пароль" onChange={this.onPassword} />
                </div>
                <div className="data-field">
                    <input type="password" placeholder="Введите новый пароль" onChange={this.onPasswordChange} />
                </div>
                <div className="data-field">
                    <input type="password" placeholder="Повторите новый пароль" onChange={this.onPasswordConfirmChange}/>
                </div>
                <div className="buttons">
                    <div className="button-1 confirm" onClick={this.handleSubmit}>
                        <h3>Подтвердить</h3>
                    </div>
                    <div className="button-2 cancel" onClick={this.RemoveClass}>
                        <h3>Отмена</h3>
                    </div>
                </div>
            </div>
        </div>;
    }
}

ReactDOM.render(
    <Settings />,
    document.querySelector('.settings_body')
);