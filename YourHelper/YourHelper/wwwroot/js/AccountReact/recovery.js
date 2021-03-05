
class Recovery extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.state = {
            email: '',
            message: '',
            errorEmail: '',
            error: ''
        }
    }
    
    onEmailChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        
        this.setState({ email: e.target.value });
    }

    CheckInputs(){
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.email === ""){
            this.setState({message: 'Поля не должны быть пустыми',
                errorEmail: 'error',
                error: 'error'})

            return false;
        }

        if(!pattern .test(this.state.email)){;
            this.setState({message: 'Почта введена неправильно',
                errorEmail: 'error',
                error: 'error'})

            return false
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
            url: '/Account/Recovery',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: this.state.email,
            }
        })
            .then(function (response) {
                if (response.data.type === "ok") {
                    window.location.href =  response.data.redirectToUrl;
                }
                else {
                    thisRef.setState({message: response.data.error,
                        errorEmail: 'error',
                        error: 'error'})

                    return false
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return <form className="recovery-form" onSubmit={this.handleSubmit}>
                        <div className="back" onClick={() => window.location.href = "../"}>
                            <i className="arrow left"></i>
                        </div>
                        <h1 className={this.state.error}>Восстановление данных</h1>
                        <Validation message={this.state.message} />
                        <div className="data-field">
                            <input className={this.state.errorEmail} autoComplete="off" type="text" placeholder="Введите почту" value={this.state.email} onChange={this.onEmailChange} />
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