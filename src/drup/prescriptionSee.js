import React,{Component} from 'react'
import DocumentTitle from 'react-document-title'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Modal} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

import NavBar from '../components/navbar/NavBar'
import see from './css/prescriptionSee.module.css'

import de_whitel_btn from '../common/images/de_whitel_btn.png'
import edit_btn from '../common/images/edit_btn.png'

import {getPrescriptionSignatureInfo,deletePrescriptionSignatureInfo} from '../common/js/resource'

const alert = Modal.alert;

class PrescriptionSee extends Component{
    constructor(props){
        super(props);
        this.state = {
            prescriptionDrugList: [],
            prescriptionSignature: {}
        }
    }
    render(){
        if(!this.props.isLogin){
            return <Redirect to="/login"/>
        }   
        return (
            <div className={see.prescriptionSee}>
                <DocumentTitle title="查看药店处方"/>
                <NavBar navbarword="基本信息"/>
                <div className={see.containner}>
                    <div>
                        <span>销售时间：</span>
                        <span>{this.state.prescriptionSignature.blTime}</span>
                    </div>
                    <div>
                        <span>就诊人：</span>
                        <span>{this.state.prescriptionSignature.userName}</span>
                    </div>
                    <div>
                        <span>身份证：</span>
                        <span>{this.state.prescriptionSignature.sfzh}</span>
                    </div>
                    <div>
                        <span>电话：</span>
                        <span>{this.state.prescriptionSignature.mobile}</span>
                    </div>
                </div>
                <NavBar navbarword="药品信息"/>
                <div className={see.containner}>
                    {
                        this.state.prescriptionDrugList.map((item,index)=>{
                            return (
                                <div key={index} className={see.drupcontainner}>
                                    <div>
                                        <span>药品名称：</span>
                                        <span>{item.drugName}</span>
                                    </div>
                                    <div>
                                        <span>药品规格：</span>
                                        <span>{item.count_unit}</span>
                                    </div>
                                    <div>
                                        <span>销售数量：</span>
                                        <span>{item.count}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <NavBar navbarword="纸质处方"/>
                <div className={see.containner}>
                    <div className={see.filePic}>
                        <img onClick={this.jumpPrescriptionCheck.bind(this)} className={see.pic} src={this.state.prescriptionSignature.pcLoadUrl} alt=""/>
                    </div>
                </div>
                <div className={see.bottomDiv}></div>
                <div className={see.fixed}>
                    <div  onClick={this.showAlert}>
                        <img src={de_whitel_btn} alt=""/>
                        <span>删除</span>
                    </div>
                    <div onClick={this.editBtn.bind(this)}>
                        <img src={edit_btn} alt=""/>
                        <span>编辑</span>
                    </div>
                </div>
            </div>
        )
    }
    showAlert =()=>{
        alert('删除', '确认删除该处方？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确认', onPress: () => this.deletePrescriptionSignatureInfoAjax() },
        ]);
    }
    editBtn(){
        this.props.history.push('/PrescriptionEdit/'+this.props.match.params.orderNo)
    }
    jumpPrescriptionCheck(){
        this.props.history.push('/PrescriptionCheck/'+this.props.match.params.orderNo)
    }

    componentDidMount(){
        this.getPrescriptionSignatureInfoAjax()
    }

    getPrescriptionSignatureInfoAjax(){
        var params = {
            body:{
                orderNo: this.props.match.params.orderNo,
                fromType: this.props.match.params.fromType
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        } 
        getPrescriptionSignatureInfo(params).then((res)=>{
            if(res.result === '0'){
                this.setState({
                    prescriptionDrugList: res.prescriptionDrugList,
                    prescriptionSignature: res.prescriptionSignature
                })
            }
        })
    }

    deletePrescriptionSignatureInfoAjax(){
        var params = {
            body:{
                orderNo: this.props.match.params.orderNo,
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        } 
        deletePrescriptionSignatureInfo(params).then((res)=>{
            if(res.result === '0'){
                this.props.history.push('/');
            }
        })
    }
}
const mapStateToProps = (state)=> {
    return {
        isLogin: state.isLogin,
        token: state.token
    }
}
export default connect(mapStateToProps,{})(PrescriptionSee)