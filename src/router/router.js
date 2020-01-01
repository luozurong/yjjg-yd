/**
 * 弃用
 */
import React from 'react'
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div></div>;
    }
  };
  
  const AsyncLogin = Loadable({
    loader: () => import('../login/Login.js'),
    loading: MyLoadingComponent
  });
  
  const AsyncPrescriptionList = Loadable({
    loader: () => import('../drup/PrescriptionList.js'),
    loading: MyLoadingComponent
  });
  
  const AsyncPrescriptionEdit = Loadable({
    loader: () => import('../drup/prescriptionEdit.js'),
    loading: MyLoadingComponent
  });
  const AsyncPrescriptionSee = Loadable({
    loader: () => import('../drup/prescriptionSee.js'),
    loading: MyLoadingComponent
  });
  const AsyncPrescriptionCheck = Loadable({
    loader: () => import('../drup/prescriptionCheck.js'),
    loading: MyLoadingComponent
  });
  
const routes = [
    {
        path: '/login',
        exact: true,
        component: AsyncLogin,
        requiresAuth: false,
    },
    {
        path: '/',
        exact: true,
        component: AsyncPrescriptionList,
        requiresAuth: true,
    },
    {
        path: '/prescriptionEdit/:id',
        exact: true,
        component: AsyncPrescriptionEdit,
        requiresAuth: true,
    },
    {
        path: '/prescriptionSee/:id',
        exact: true,
        component: AsyncPrescriptionSee,
        requiresAuth: true,
    },
    {
        path: '/prescriptionCheck/:id',
        exact: true,
        component: AsyncPrescriptionCheck,
        requiresAuth: true,
    }
];


// import renderRoutes from './router/renderRoutes'
// import routes from './router/router'
// import store from './redux/index' 

//const authPath = '/';
 //var authed = store.getState().isLogin
//{renderRoutes(routes, authed ,authPath)}



export default routes;