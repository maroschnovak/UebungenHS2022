import React, {Component} from "react";

class Timer extends Component {
    constructor(props) {
        super(props);
        
        this.countdown = props.countdown
        this.state = {time: this.countdown};

        this.click = this.click.bind(this);
        this.updateTime = this.updateTime.bind(this);
    }

    click(event) {
        this.setState({time: this.countdown});
        clearInterval(this.interval);
        this.interval = setInterval(this.updateTime, 1000);
    }

    updateTime() {
        if (this.state.time == 1) {
            this.setState({time: "FERTIG"});
            clearInterval(this.interval);
        }
        else {
            this.setState({time: this.state.time - 1});
        };
    }

    render() {
        return(<>
            <hr/>
            <h1>Countdown: {this.countdown} Sekunden</h1>
            {this.state.time}
            <br/><br/>
            <button onClick={this.click}>Start</button>
            <hr/>
        </>)
    }


}

export default Timer;