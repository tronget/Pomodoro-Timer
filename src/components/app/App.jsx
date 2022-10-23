import "./App.css";
import Timer from "../timer/timer";
import TimerSettings from "../timer-settings/timer-settings";
import { Component } from "react";

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         time: {
            workTime: 25,
            breakTime: 5,
         },
         isPause: true,
         isWork: true,
         workTimeLast: 25 * 60 * 1000,
         breakTimeLast: 5 * 60 * 1000,
      };
   }

   checkTime = () => {
      if (this.state.isPause) {
         let type = this.state.isWork ? "work" : "break";
         type += "TimeLast";
         let a = setInterval(() => {
            this.setState((state) => {
               const newValue = state[type] - 1000;
               if (newValue < 0) {
                  type = type[0] === "w" ? "breakTimeLast" : "workTimeLast";
                  return {
                     isWork: !state.isWork,
                     workTimeLast: state.time.workTime * 60 * 1000,
                     // breakTimeLast: state.time.breakTime * 60 * 1000
                  };
               }
               return { [type]: newValue };
            });
            if (this.state.isPause) clearInterval(a);
         }, 1000);
      }
   };

   onChangePause = () => {
      this.setState(({ isPause }) => ({ isPause: !isPause }));
      // this.setState(({isWork}) => ({isWork: !isWork}));
      this.checkTime();
   };

   onChangeTime = (type, value) => {
      this.setState(({ time }) => {
         const newValue = { ...time, [type + "Time"]: value };
         return { time: newValue, [type + "TimeLast"]: value * 60 * 1000 };
      });
   };
   render() {
      const { workTimeLast, breakTimeLast, isPause, isWork } = this.state;
		if (!isWork) document.body.style.backgroundColor = "rgb(0, 147, 167)";
		else document.body.style.backgroundColor = "rgb(255, 107, 107)"
      return (
         <div className="App">
            <h1 style={{ color: "#fff" }}>Pomodoro Timer</h1>
            <Timer
               workTimeLast={workTimeLast}
               breakTimeLast={breakTimeLast}
               pause={isPause}
               isWork={isWork}
            />
            <TimerSettings
               onChangeTime={this.onChangeTime}
               onChangePause={this.onChangePause}
            />
         </div>
      );
   }
}

export default App;
