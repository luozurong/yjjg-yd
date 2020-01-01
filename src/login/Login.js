import React, { Component } from 'react';
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'

import {inLogin,setAccount,setToken} from '../redux/actionCreator'
import {setCookie} from '../common/js/common.js'
import {userLogin} from '../common/js/resource'

import login from './login.module.css'

import logo from '../common/images/logo.png'
import user_icon from '../common/images/user_icon.png'
import password_icon from '../common/images/password_icon.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isFlags: 2,
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassworld = this.handlePassworld.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  render() {
    return (
      <div className={login.login}>
        <DocumentTitle title='登录'></DocumentTitle>
        <img className={login.logo} src={logo} alt="" />
        <div className={login.wrap}>
          <img src={user_icon} alt="" />
          <input onChange={this.handleUsername} placeholder="请输入用户名" />
        </div>
        <div className={login.wrap}>
          <img src={password_icon} alt="" />
          <input onChange={this.handlePassworld} type="password" placeholder="请输入用户密码" />
        </div>
        <div onClick={this.handleSubmit} className={login.submit}>登录</div>
      </div>
    );
  }
  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  handlePassworld(e) {
    this.setState({
      password: e.target.value
    })
  }
  handleSubmit() {
    if(this.state.username === '') {
      Toast.info('请输入用户名', 1);
      return false;
    }
    if(this.state.password === '') {
      Toast.info('请输入用户密码', 1);
      return false;
    }
    console.log(this.props.token);
    this.userLoginAjax();   
  }
  userLoginAjax(){
    var params = {
      body:{
        account: this.state.username,
        password: this.state.password,
        loginType: '0',
      },
      header: {
        token: this.props.token,
        time_stamp: new Date().getTime()
      }
    }
    console.log(params);
    userLogin(params).then((res)=>{
      console.log(res);
      if(res.code === '0'){
        this.props.inLogin(true);
        this.props.setAccount(res.account);
        this.props.setToken(res.token) 
        setCookie('isLoginYD', true, 1);  //判断时候登录
        setCookie('accountYD', res.account, 1);  
        setCookie('tokenYD', res.token, 1); 
        this.props.history.push('/');
      }else{
        Toast.info(res.reason, 1);
      }
    })
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
})(Login);
