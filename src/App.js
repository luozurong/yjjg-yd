import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
      return <div></div>;
  }
};

const AsyncLogin = Loadable({
  loader: () => import('./login/Login.js'),
  loading: MyLoadingComponent
});

const AsyncPrescriptionList = Loadable({
  loader: () => import('./drup/PrescriptionList.js'),
  loading: MyLoadingComponent
});
const AsyncPrescriptionEdit = Loadable({
  loader: () => import('./drup/prescriptionEdit.js'),
  loading: MyLoadingComponent
});
const AsyncPrescriptionSee = Loadable({
  loader: () => import('./drup/prescriptionSee.js'),
  loading: MyLoadingComponent
});
const AsyncPrescriptionCheck = Loadable({
  loader: () => import('./drup/prescriptionCheck.js'),
  loading: MyLoadingComponent
});
const AsyncTest = Loadable({
  loader: () => import('./common/js/sds.js'),
  loading: MyLoadingComponent
});
const AsyncTime = Loadable({
  loader: () => import('./common/js/time.js'),
  loading: MyLoadingComponent
});
const AsyncPrescriptionDetail = Loadable({
  loader: () => import('./drup/prescriptionDetail.js'),
  loading: MyLoadingComponent
});

class App extends Component {
  render(){
    return (
      <BrowserRouter basename="dsasYD">
          <Route path='/' exact={true} component={AsyncPrescriptionList}/>
          <Route path='/PrescriptionEdit/:orderNo' exact={true} component={AsyncPrescriptionEdit}/>
          <Route path='/PrescriptionSee/:orderNo/:fromType' exact={true} component={AsyncPrescriptionSee}/>
          <Route path='/PrescriptionCheck/:orderNo' exact={true} component={AsyncPrescriptionCheck}/>
          <Route path='/PrescriptionDetail/:orderNo/:fromType' exact={true} component={AsyncPrescriptionDetail}/>
          <Route path='/login' exact={true} component={AsyncLogin}/>
          <Route path='/test' exact={true} component={AsyncTest}/>
          <Route path='/time' exact={true} component={AsyncTime}/>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}
export default connect(mapStateToProps, {

})(App);

