import { Component } from "react";
import "./timer-settings.css";
import TimerRange from "../timer-range/timer-range";

class TimerSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pause: true
		}
	}
	onPause = () => {
		this.setState(({pause}) => ({pause: !pause}))
		this.props.onChangePause();
	}
	render() {
		const {onChangeTime} = this.props;
		const {pause} = this.state;
		let extraClass = pause ? "" : "active"
		return(
			<div className={"timer-settings " + extraClass}>
				<TimerRange type="work"
					onChangeTime={onChangeTime}
				/>
				<button className="timer-settings__btn" 
					onClick={this.onPause}>
						{pause ? 'Start' : 'Pause'}
				</button>
				<TimerRange type="break"
					onChangeTime={onChangeTime}
				/>
			</div>
		)
	}
}
export default TimerSettings;