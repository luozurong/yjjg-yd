import React, { Component } from 'react';
import DocumentTitle from 'react-document-title'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {getPrescriptionOrderList} from '../common/js/resource'
import OutLogin from '../login/outLogin'

import NavBar from '../components/navbar/NavBar'
import MoreData from '../components/moreData/moreData'

import preList from './css/prescriptionList.module.css'

import arrow_icon from '../common/images/arrow_icon.png'
import add_cf_btn from '../common/images/add_cf_btn.png'


class PrescriptionList extends Component {
    constructor(props) {
        super(props);
        this.prescriptionEdit = this.prescriptionEdit.bind(this); 
        console.log(props);
        this.state = {
            moreDataWord: '点击加载更多数据',
            drugStore: {},
            prescriptionListAttr: [],
            pageNum: 1
        }
    }
    
    render() {   
        if(!this.props.isLogin){
            return <Redirect to="/login"/>
        }    
        return (
            <div>
                <DocumentTitle title="药店处方列表"/>
                <NavBar navbarword="药店信息"/>
                <div className={preList.drupname}>
                    <div>
                        <span>药店名称：</span>
                        <span>{this.state.drugStore.drugStoreName}</span>
                    </div>
                    <div>
                        <span>药店编码：</span>
                        <span>{this.state.drugStore.storeNo}</span>
                    </div>
                    <div>
                        <span>药店地址：</span>
                        <span>{this.state.drugStore.drugStoreAddress}</span>
                    </div>
                </div>
                <NavBar calanderReturn={this.onConfirm.bind(this)} navbarword="处方列表" isShowNav={true}/>
                <div className={preList.drupContanner}>
                    {
                       this.state.prescriptionListAttr.map((item,index) => {
                           return (
                               <div key={index} onClick={this.jumpPrescriptionSee.bind(this,item.fromType,item.orderNo)} className={preList.drupItem}>
                                    <div>
                                        <div>
                                            <span>销售时间：</span>
                                            <span>{item.blTime ? item.blTime.slice(0,11):''}</span>
                                        </div>
                                        <div>
                                            <span>就诊人：</span>
                                            <span>{item.userName}</span>
                                        </div>
                                        <div className={preList.drupnameList}>
                                            <span>药品信息：</span>
                                            <div>
                                            {
                                                item.prescriptionDrugList.map((list,index)=>{
                                                    return (
                                                        <span key={index}>
                                                            <span>{list.drugName}</span>
                                                            <span className={preList.drupNum}>{list.count}{list.countUnit}</span>
                                                        </span>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <img src={arrow_icon} alt=""/>
                                </div>
                           )
                       }) 
                    }
                </div>
                <MoreData moreReturn={this.moreReturnFunc.bind(this)} moreDataWord={this.state.moreDataWord}></MoreData>
                <div className={preList.borderHeight}></div>
                <div className={preList.newFixed}>
                    <div onClick={this.prescriptionEdit}>
                        <img src={add_cf_btn} alt=""/>
                        <span>新增处方</span>
                    </div>
                </div>
                <OutLogin></OutLogin>
            </div>
          )
    }
    prescriptionEdit(){
        this.props.history.push('/PrescriptionEdit/0')
    }

    jumpPrescriptionSee(fromType,orderNo){
        if(fromType === '2'){
            this.props.history.push('/PrescriptionSee/'+orderNo+'/'+fromType)
        }else{
            this.props.history.push('/PrescriptionDetail/'+orderNo+'/'+fromType)
        }
    }
    
    moreReturnFunc(e){
        if(this.state.moreDataWord === '点击加载更多数据'){
            var pageNum = this.state.pageNum
            this.getPrescriptionOrderListAjax(pageNum,'','');
        }
    }

    componentDidMount(){
        this.getPrescriptionOrderListAjax(1,'','');
    }

    onConfirm(obj){
        this.setState({
            pageNum: 1,
            prescriptionListAttr:[],
            moreDataWord: '点击加载更多数据'
        });
        console.log(obj);
        this.getPrescriptionOrderListAjax(1,obj.start,obj.endTime)
    }

    getPrescriptionOrderListAjax(pageNum,start,end){
        var params = {
            body:{
                drugstoreAccount: this.props.account,
                start: start,
                end: end,
                pageSize: 10,
                pageNum: pageNum,
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        } 
        getPrescriptionOrderList(params).then((res)=>{
            console.log(res);
            if(res.result === '0'){
               
                var prescriptionListAttrTemp = this.state.prescriptionListAttr.concat(res.list);
                var pageNumTemp = this.state.pageNum;
                this.setState({
                    drugStore: res.drugStore,
                    prescriptionListAttr: prescriptionListAttrTemp,
                    pageNum: pageNumTemp + 1
                });
                
                if(res.list.length < 10){
                    this.setState({
                        moreDataWord: '没有更多数据了'
                    });
                }
            }
        });
    }
}
const mapStateToProps = (state)=> {
    return {
        isLogin: state.isLogin,
        account: state.account,
        token: state.token
    }
}
export default connect(mapStateToProps,{})(PrescriptionList);