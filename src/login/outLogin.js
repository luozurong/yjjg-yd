import React, { Component } from 'react';
import {connect} from 'react-redux'
import 'antd-mobile/dist/antd-mobile.css'

import {inLogin,setAccount,setToken} from '../redux/actionCreator'
import {setCookie} from '../common/js/common.js'

import login from './login.module.css'
import logout from '../common/images/logout.png'

class OutLogin extends Component {
  render() {
    return (
      <div className={login.outLoginClass}>
        <img src={logout} alt="" onClick={this.outLogin.bind(this)}/> 
      </div>
    );
  }
  outLogin(){
    this.props.inLogin(false);
    this.props.setAccount('');
    this.props.setToken('');
    setCookie('isLoginYD','',false)
    setCookie('accountYD','',null)
    setCookie('tokenYD','',null)
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    account: state.account,
    token: state.token
  }
}

export default connect(mapStateToProps, {
  inLogin,setAccount,setToken
})(OutLogin);
