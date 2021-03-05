
const { useState, useEffect } = React

function ProfileMenu(props) {
    const [visible, setVisible] = useState('hide');

    useEffect(() => {
        setVisible(props.visible);
    });
    
    function Logout(){
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
    }
    
    return (
        <div className={"profile_menu " + visible}>
            <div className="profile_menu_content">
                <div className="profile_menu_body">
                    <div className="profile_menu_button settings" onClick={() => window.location.href = "../Account/Settings"}>
                        <div className="settings-img img"></div>
                        <h3>Настройки</h3>
                    </div>
                    <div className="profile_menu_button logout" onClick={Logout}>
                        <div className="logout-img img"></div>
                        <h3>Выйти</h3>
                    </div>
                </div>
            </div>
        </div>);
}