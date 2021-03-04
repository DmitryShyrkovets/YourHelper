
class Profile_menu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(function() {
            $('.header_profile').click(function () {
                $('.profile_menu').toggleClass('hide');
            });

            $('.logout').click(function () {
                axios({
                    method: 'get',
                    url: '/Account/Logout',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(function (response) {
                        window.location.href =  response.data.redirectToUrl;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

            $('.settings').click(function () {
                window.location.href = "../Account/Settings"
            });
        });
       
    }

    render() {
        return <div className="profile_menu_content">
            <div className="profile_menu_body">
                <div className="profile_menu_button settings">
                    <div className="settings-img img"></div>
                    <h3>Настройки</h3>
                </div>
                <div className="profile_menu_button logout">
                    <div className="logout-img img"></div>
                    <h3>Выйти</h3>
                </div>
            </div>
        </div>;
    }
}

ReactDOM.render(
    <Profile_menu />,
    document.querySelector('.profile_menu')
);