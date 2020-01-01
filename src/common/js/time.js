import React, {Component} from 'react'
import { DatePicker, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';


class Time extends Component {
  state = {
    date: '',
  }
  render() {
    return (
      <div>
        <DatePicker
          mode="date"
          title="Select Date"
          extra="Optional"
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">Date</List.Item>
        </DatePicker>

      </div>
    );
  }
}

export default Time;