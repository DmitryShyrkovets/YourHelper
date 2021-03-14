var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

class DatePicker extends React.Component{

    componentDidMount() {

        this.$el = $(this.el);
        console.log(this.props.dates)
        let dates = this.props.dates

        this.$el.datepicker({
            isRTL: false,
            format: 'dd.mm.yyyy',
            autoclose:true,
            language: 'ru',
            beforeShowDay: function(date) {
                let check = new Date(date).toLocaleString("ru", options);
                for (let i = 0; i < dates.length; i++){
                    console.log(dates[i].dateTime.substr(0, 10));
                    if (check === dates[i].dateTime.substr(0, 10)) {
                        // console.log(test[i].dateTime)
                        return {classes: 'highlight', tooltip: 'Title'};
                    }
                }
            }
        });

        this.$el.val(this.props.date);
        this.handleChange = this.handleChange.bind(this);

        this.$el.on('changeDate', this.handleChange);
    }

    componentWillUnmount() {
        this.$el.off('changeDate', this.handleChange);
        this.$el.datepicker('destroy');
    }

    handleChange(e){
        this.props.changeDate(e.target.value);
    }


    render(){
        return (
            <div>
                <div className="datepicker-area">
                    <input className="datepicker" value={this.props.date} readOnly data-provide="datepicker" ref={el => this.el = el}/>
                </div>
            </div>
        );
    }

}