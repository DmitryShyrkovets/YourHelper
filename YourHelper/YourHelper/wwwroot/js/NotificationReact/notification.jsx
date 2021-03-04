let notification

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close(){
        notification.toggleClass('active');
    }
    
    componentDidMount() {
        $(document).ready(function() {
            notification = $('.notification');
        });

    }

    render() {
        return <div className="notification_content">
            <div className="header">
                <h2>Уведомление</h2>
                <div className="close" onClick={this.close}>
                    <h4>&#10006;</h4>
                </div>
            </div>
            <h3 className="body"></h3>
        </div>;
    }
}

ReactDOM.render(
    <Notification />,
    document.querySelector('.notification')
);