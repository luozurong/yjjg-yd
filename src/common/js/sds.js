import React, {Component} from 'react'
import {Calendar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';




const now = new Date();

export default class Test extends Component {
  originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      config: {},
    };
  }

  onCancel(){}

  onConfirm(){}

  onSelectHasDisableDate = (dates) => {
    console.warn('onSelectHasDisableDate', dates);
  }

  onConfirm = (startTime, endTime) => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime,
      endTime,
    });
  }

  onCancel = () => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime: undefined,
      endTime: undefined,
    });
  }

  render() {
    return (
      <div>
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          infiniteOpt={true}
          defaultDate={now}
          minDate={new Date(+now - 31536000000)}
          maxDate={new Date(+now + 31536000000)}
        />
      </div>
    );
  }
}
