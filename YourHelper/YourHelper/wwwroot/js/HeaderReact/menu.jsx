
class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        $(document).ready(function(){
            $('.header_burger').click(function(){
                $('.header_burger,.header_menu').toggleClass('active');
                $('.index, .logo').toggleClass('hide');
                $('body').toggleClass('lock');
            });
        });
    }
    
    render() {
        return <div className="container">
            <div className="header_body">
                <div className="header_burger_menu">
                    <div className="header_burger">
                        <span></span>
                    </div>
                    <nav className="header_menu">
                        <ul className="header_list">
                            <li>
                                <div className="logo">
                                    <a href="../../Home/Index">
                                        <img src="../../images/logo.png" alt="logo"/>
                                    </a>
                                </div>
                                <a href="../../Home/Index" className="index hide">Главная</a>
                            </li>
                            <li>
                                <a href="#">Дневник</a>
                            </li>
                            <li>
                                <a href="#">Заметки</a>
                            </li>
                            <li>
                                <a href="#">Распорядок</a>
                            </li>
                            <li>
                                <a href="#">Цели</a>
                            </li>
                            <li>
                                <a href="#">Финансы</a>
                            </li>
                            <li>
                                <a href="#">Навыки</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="search">
                    <input type="text" placeholder="Поиск..."/>
                    <button type="submit"><i className="fa fa-search"></i></button>
                </div>
                <div className="header_profile">
                    <h2>Профиль</h2>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(
    <Menu />,
    document.getElementById("head")
);