import "./timer.css";
import { Component } from "react";
import { Fragment } from "react";

class Timer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // workTime: props.time.workTime * 60 * 1000,
         // breakTime: props.time.breakTime * 60 * 1000,
         // pause: props.pause,
      };
   }
   render() {
      const { workTimeLast, breakTimeLast, isWork, pause } = this.props;
      const extraClass = isWork ? "" : " break";
      let [workTimeMinutes, workTimeSeconds] = [
         Math.floor(+workTimeLast / 60 / 1000),
         Math.floor((+workTimeLast / 1000) % 60),
      ].map(correctTime);

      let [breakTimeMinutes, breakTimeSeconds] = [
         Math.floor(+breakTimeLast / 60 / 1000),
         Math.floor((+breakTimeLast / 1000) % 60),
      ].map(correctTime);

		function correctTime(el) {
			if (String(el).length < 2) {
				return '0' + String(el);
			}
			return el;
		}
      return (
			<Fragment>
				<div className={"timer" + extraClass}>
					<div className="back">
						<p className="minutes">{breakTimeMinutes}</p>
						<span>:</span>
						<p className="seconds">{breakTimeSeconds}</p>
					</div>
					<div className="front">
						<p className="minutes">{workTimeMinutes}</p>
						<span>:</span>
						<p className="seconds">{workTimeSeconds}</p>
					</div>
				</div>
				<p style={{color: "#fff", fontSize: 30, position: "absolute", left: "50%", transform: "translateX(-50%)"}}>{pause ? "" : isWork ? "Study & Work!" : "Relax! Drink water and do what you want."}</p>
			</Fragment>
      );
   }
}
export default Timer;
