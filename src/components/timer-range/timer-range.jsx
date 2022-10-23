import { Component } from "react";
import { Icon } from "@iconify/react";
import "./timer-range.css";

class TimerRange extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: props.type === 'break' ? 5 : 25,
      };
   }
   onChangeRange = (e) => {
      const { type, onChangeTime } = this.props;
      const { value } = this.state;
      const typeRange = e.target.dataset.range 
		?? e.target.parentElement.dataset.range;
		let newValue = 0;
      if (typeRange === "increase") {
         newValue = value + 5;
      } else {
			if (value === 5) return;
			newValue = value - 5;
		}
		this.setState({value: newValue})
      onChangeTime(type, newValue);
   };
   render() {
      const { type } = this.props;
      const { value } = this.state;
      return (
         <div className="timer-range">
            <Icon
               icon="eva:arrow-ios-upward-fill"
               onClick={this.onChangeRange}
               data-range="increase"
            />
            <p className="timer-range__value">
               {value}
            </p>
            <Icon
               icon="eva:arrow-ios-downward-fill"
               onClick={this.onChangeRange}
               data-range="decrease"
            />
            <p style={{color: "#fff", fontSize: 30, margin: 0}}>{type}</p>
         </div>
      );
   }
}
export default TimerRange;
