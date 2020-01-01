import React,{Component} from 'react'
import DocumentTitle from 'react-document-title'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import check from './css/prescriptionCheck.module.css'

import {getPrescriptionSignatureInfo} from '../common/js/resource'

class PrescriptionCheck extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            prescriptionSignature: {}
        }
    }
    render(){
        if(!this.props.isLogin){
            return <Redirect to="/login"/>
        }   
        return (
            <div>
                <DocumentTitle title="查看药店处方"/>
                <img className={check.checkpic} src={this.state.prescriptionSignature.pcLoadUrl} alt=""/>
            </div>
        );
    }

    componentDidMount(){
        this.getPrescriptionSignatureInfoAjax()
    }

    getPrescriptionSignatureInfoAjax(){
        var params = {
            body:{
                orderNo: this.props.match.params.orderNo,
                fromType: 2
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        } 
        getPrescriptionSignatureInfo(params).then((res)=>{
            console.log(res);
            if(res.result === '0'){
                this.setState({
                    prescriptionSignature: res.prescriptionSignature
                })
            }
        })
    }
    
}
const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        token: state.token
    }
}
export default connect(mapStateToProps,{})(PrescriptionCheck)