import React, {Component} from 'react'
import {Calendar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import navbar from './navbar.module.css'
import date_btn from '../../common/images/date_btn.png'

import {getTimeDate} from '../../common/js/common'

const now = new Date();

class NavBar extends Component{
   
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          config: {},
          startTime: '',
          endTime: '',
          originbodyScrollY: document.getElementsByTagName('body')[0].style.overflowY
        };
    
    }
  
    onSelectHasDisableDate = (dates) => {
        console.warn('onSelectHasDisableDate', dates);
    }

    onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.state.originbodyScrollY;
        this.setState({
            show: false
        });
        return this.props.calanderReturn({
            start: getTimeDate(startTime),
            endTime: getTimeDate(endTime)
        })
    }

    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.state.originbodyScrollY;
        this.setState({
            show: false,
            startTime: '',
            endTime: '',
        });
    }
    navBarClick(){
        this.setState({
            show: true,
            originbodyScrollY: document.getElementsByTagName('body')[0].style.overflowY
        })
    }
    render(){
        return (
            <div className={navbar.navbar}>
                <div  className={navbar.wrap}>
                    <i></i>
                    <span>{this.props.navbarword}</span>
                </div>
                {(()=>{
                    if(this.props.isShowNav){
                        return <img onClick={this.navBarClick.bind(this)} src={date_btn} alt=""/>
                    }
                })()}
                {(()=>{
                    if(this.props.isShowNav){
                        return (
                            <Calendar
                            {...this.state.config}
                            visible={this.state.show}
                            onCancel={this.onCancel}
                            onConfirm={this.onConfirm}
                            onSelectHasDisableDate={this.onSelectHasDisableDate}
                            infiniteOpt={true}
                            minDate={new Date(+now - 31536000000)}
                            maxDate={new Date(+now + 31536000000)}
                        />
                        )
                    }
                })()}
            </div>
        )
    } 
}

export default NavBar