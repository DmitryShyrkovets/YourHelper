import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Menu} from "../header/menu";
import {Dropdown} from "../ui/dropdown";
import {Finance} from "./finance";
import {AddFinance} from "./add_finance";
import {Filter} from "./filter";
import {EditFinance} from "./edit_finance";

export function Finances(props){
    
    const [loading, setLoading] = useState(true);
    const [operations, setOperations] = useState([{id: '0', category: 'Приход'}, {id: '1', category: 'Расход'}, {id: '2', category: 'Прибыль'}]);
    const [selectOperation, setSelectOperation] = useState('Прибыль');
    const [finances, setFinances] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itogs, setItogs] = useState([]);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        LoadPage();
    }, [state.finance.token])

    function LoadPage() {
        axios({
            method: 'post',
            url: '/Finance/LoadFinances',
            headers: { 'Content-Type': 'application/json' },
            data: {
                DateFilter: state.finance.allDates.toString(),
                Category: state.finance.categorySelect,
                Operation: selectOperation,
                DateStart: state.finance.dateStart,
                DateEnd: state.finance.dateEnd
            }

        })
            .then(function (response) {
                setFinances(response.data);

                axios({
                    method: 'get',
                    url: '/Finance/LoadCategories',
                    headers: { 'Content-Type': 'application/json' },

                })
                    .then(function (response) {
                        setCategories(response.data);

                        axios({
                            method: 'post',
                            url: '/Finance/LoadItogs',
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                DateFilter: state.finance.allDates.toString(),
                                Category: state.finance.categorySelect,
                                Operation: selectOperation,
                                DateStart: state.finance.dateStart,
                                DateEnd: state.finance.dateEnd
                            }

                        })
                            .then(function (response) {
                                setItogs(response.data);
                                setLoading(false);

                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    function onAdd() {
        dispatch({type: 'ADD_FORM_SHOW_FINANCE'});
    }

    function onParam() {
        dispatch({type: 'PARAM_FORM_SHOW_FINANCE'});
    }

    function onChangeSelectOperation(value){
        setSelectOperation(value);
        dispatch({type: 'TOKEN'});
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className={'content container finances'}>
            <div className="finances-actions">
                <div className={"add-action " + state.finance.actionVisible} onClick={() => onAdd()}>
                    <div className="add-icon icon">

                    </div>
                </div>
                <div className={"param-action " + state.finance.actionVisible} onClick={() => onParam()}>
                    <div className="settings-icon icon">

                    </div>
                </div>
                <Filter categories={categories}/>
            </div>
            <div className="finances-content">
                <AddFinance categories={categories}/>
                <EditFinance categories={categories}/>
                <div className={'table-type ' + state.finance.financesVisible}>
                    <Dropdown categories={operations} select={selectOperation} onChangeSelect={onChangeSelectOperation}/>
                </div>

                {finances.length < 1 ? 
                    (<h2 className={"empty " + state.finance.financesVisible}>Записей нету</h2>): 
                    (<div>
                        <table className={'finance-table ' + state.finance.financesVisible}>
                            <tr>
                                <th className={'header-border-1'}>Название</th>
                                <th className={'header-border-2 mobile-hide'}>Категория</th>
                                <th className={'header-border-3 mobile-hide'}>Дата</th>
                                <th className={'header-border-4'}>Сумма</th>
                                <th colSpan="2" className={'header-border-5'}>Действия</th>
                            </tr>
                            {finances.map((finance) =>
                                <Finance key={finance.id} finance={finance} operation={selectOperation}/>)
                            }
                        </table>
                        <div className={'itog ' + state.finance.financesVisible}>
                            <p>Итого:</p>
                            {itogs.map((itog) =>
                                <div key={itog.id} className={'subitog'}>
                                    <p>{itog.currency + ': '} </p>
                                    <p>{itog.money}</p>
                                </div>)
                            }

                        </div>
                    </div>
                    )
                }
                
            </div>
        </div>);
    
    return(
        <div>
            <div id="head-menu">
                <Menu />
            </div>
            {content}
        </div>
    );
}

