import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {Toast} from 'antd-mobile'
import { DatePicker} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import  NavBar from '../components/navbar/NavBar.js'
import edit from './css/prescriptionEdit.module.css'

import upload_icon from '../common/images/upload_icon.png'
import del_gray_btn from '../common/images/del_gray_btn.png'

import {getPrescriptionSignatureInfo,saveOrUpdateServletSignatureInfo} from '../common/js/resource'
import {isEmpty} from '../common/js/common.js'

class PrescriptionEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: '',
            orderNo: this.props.match.params.orderNo,
            prescriptionDrugList: [],
            prescriptionSignature: {},
            pcLoadUrlFile: null,
            imgURL: '',
        }
        console.log(props)
    }
    render(){
        if(!this.props.isLogin){
            return <Redirect to="/login"/>
        }   

        //销售期间处理
        var blTime = '';
        var times = this.state.prescriptionSignature.blTime
        if(!isEmpty(times)){
            blTime = times.slice(0,11)
        }else{
            blTime = '';
        }
        
        return (
            <div>
                <DocumentTitle title="编辑药店处方"/>
                <NavBar navbarword="基本信息"/>
                <form action="" encType="multipart/form-data" id="prescriptionEditForm">
                    <div className={[edit.containner,edit.wrap].join(' ')}>
                        <div className={edit.inputValue}>
                            <span>销售时间</span>
                            <DatePicker mode="date"  extra="Optional" value={this.state.date} onChange={date => this.dateChange({ date })} >
                                {(()=>{
                                    if(blTime===''){
                                        return <input className={edit.inputValueOutline} placeholder="请填写销售时间" readOnly defaultValue={blTime}/>
                                    }else{
                                        return <span  className={edit.inputValueOutline}>{blTime}</span>
                                    }
                                })()}
                            </DatePicker>
                        </div>
                        <div className={edit.inputValue}>
                            <span>就诊人</span>
                            <input placeholder="请填写就诊人姓名" name="userName" onChange={this.userName.bind(this)} defaultValue={this.state.prescriptionSignature.userName}/>
                        </div>
                        <div className={edit.inputValue}>
                            <span>身份证</span>
                            <input placeholder="请填写就诊人身份证" name="userName" onChange={this.sfzh.bind(this)} defaultValue={this.state.prescriptionSignature.sfzh}/>
                        </div>
                        <div className={edit.inputValue}>
                            <span><span style={{ color: 'red' }}>*</span>电话</span>
                            <input placeholder="请填写就诊人联系电话" onChange={this.mobile.bind(this)} defaultValue={this.state.prescriptionSignature.mobile}/>
                        </div>
                    </div>
                    <NavBar navbarword="药品信息"/>
                    <div className={edit.containner}>
                        {this.state.prescriptionDrugList.map((item,index) => {
                            return (
                                <div key={index}>
                                    <div className={edit.delete}>
                                        <img onClick={this.delecteDrug.bind(this,index)} src={del_gray_btn} alt=""/>
                                    </div>
                                    <div className={edit.inputValue}>
                                        <span><span style={{ color: 'red' }}>*</span>药品名称</span>
                                        <input onChange={this.drugName.bind(this,index)} placeholder="请填写药品名称" defaultValue={item.drugName}/>
                                    </div>
                                    <div className={edit.inputValue}>
                                        <span><span style={{ color: 'red' }}>*</span>药品规格</span>
                                        <input onChange={this.countUnit.bind(this,index)} placeholder="请填写药品规格" defaultValue={item.count_unit}/>
                                    </div>
                                    <div className={edit.inputValue}>
                                        <span><span style={{ color: 'red' }}>*</span>销售数量</span>
                                        <input onChange={this.count.bind(this,index)} placeholder="请填写药品销售数量" defaultValue={item.count}/>
                                    </div>
                                </div>
                            )
                        })}
                        {(()=>{
                            if(this.state.prescriptionDrugList.length < 6){
                                return (
                                    <div className={edit.addDrup}>
                                        <span onClick={this.addDrup.bind(this)}>添加</span>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                    
                    <NavBar navbarword="纸质处方"/>
                    <div className={edit.containner}>
                        {(()=>{
                            if(Number(this.state.orderNo) === 0){
                                return (
                                    <div className={edit.file}>
                                        <div>
                                            {(()=>{
                                                if(this.state.imgURL === ''){
                                                    return  <img className={edit.localPic} src={upload_icon} alt=""/>
                                                }else{
                                                    return  <img src={this.state.imgURL} alt=""/>
                                                }
                                             })()}
                                        
                                            <input id="pcLoadUrl" type="file" onChange={this.pcLoadUrlClick.bind(this)}/>
                                        </div>
                                        <div>上传纸质处方</div>
                                    </div>
                                )
                            }else{
                                return (
                                    <div className={edit.loadingfile}>
                                        <div>
                                            {(()=>{
                                                if(this.state.imgURL === ''){
                                                    if( this.state.prescriptionSignature.pcLoadUrl === ''){
                                                        return  <img src={upload_icon} alt=""/>
                                                    }else{
                                                        return  <img src={this.state.prescriptionSignature.pcLoadUrl} alt=""/>
                                                    }
                                                }else{
                                                    return  <img src={this.state.imgURL} alt=""/>
                                                }
                                             })()}
                                            <input id="pcLoadUrl" type="file" onChange={this.pcLoadUrlClick.bind(this)}/>
                                        </div>
                                        <div>上传纸质处方</div>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                    <div className={edit.heightDiv}></div>
                    <div className={edit.newFixed}  onClick={this.editSubmit.bind(this)}>
                        <div>
                            <span>提交</span>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    //日期选择
    dateChange({date}){
        console.log(date);
        var yy = date.getFullYear();
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        var prescriptionSignatureValue = this.state.prescriptionSignature
        prescriptionSignatureValue.blTime = yy + '-' + mm + '-' +dd
        this.setState({
            prescriptionSignature: prescriptionSignatureValue
        }); 
    }
    //用户名
    userName(e){
        var userNameValue = e.target.value;
        this.setState({
            prescriptionSignature: Object.assign(this.state.prescriptionSignature,{userName:userNameValue})
        });
    }
    //身份证
    sfzh(e){
        var sfzhValue = e.target.value;
        this.setState({
            prescriptionSignature: Object.assign(this.state.prescriptionSignature,{sfzh:sfzhValue})
        });
    }
    //手机
    mobile(e){
        var mobileValue = e.target.value;
        this.setState({
            prescriptionSignature: Object.assign(this.state.prescriptionSignature,{mobile:mobileValue})
        });
    }
    //药品名称
    drugName(index,e){
        const prescriptionDrugListAttr = this.state.prescriptionDrugList;
        prescriptionDrugListAttr[index].drugName = e.target.value
        this.setState({
            prescriptionDrugList: prescriptionDrugListAttr
        });
    }
    //药品规格
    countUnit(index,e){
        const prescriptionDrugListAttr = this.state.prescriptionDrugList;
        prescriptionDrugListAttr[index].count_unit = e.target.value
        this.setState({
            prescriptionDrugList: prescriptionDrugListAttr
        });
    }
    //数量
    count(index,e){
        const prescriptionDrugListAttr = this.state.prescriptionDrugList;
        prescriptionDrugListAttr[index].count = e.target.value
        this.setState({
            prescriptionDrugList: prescriptionDrugListAttr
        });
    }
    //删除
    delecteDrug(index){
        const prescriptionDrugListAttr = this.state.prescriptionDrugList;
        prescriptionDrugListAttr.splice(index,1);
        this.setState({
            prescriptionDrugList: prescriptionDrugListAttr
        });
    }
    //图片
    pcLoadUrlClick(e){
        var pcLoadUrlFile = document.getElementById('pcLoadUrl');
        const file = e.currentTarget.files[0];
        const imgURL = window.URL.createObjectURL(file);
      
        this.setState({
            pcLoadUrlFile: pcLoadUrlFile.files[0],
            imgURL: imgURL
        });
    }
    //添加
    addDrup(){
        if(!this.prescriptionDrugListShuan()) return false;
        var addDrupAttr = {
            count: '',
            count_unit: '',
            drugName: '',
            norms: ''
        }
        const prescriptionDrugListAttr = this.state.prescriptionDrugList;
        prescriptionDrugListAttr.push(addDrupAttr);
        this.setState({
            prescriptionDrugList: prescriptionDrugListAttr
        });
    }
    //检测药品信息
    prescriptionDrugListShuan(){ 
        const prescriptionDrugListAttr = this.state.prescriptionDrugList;
        for(var i = 0; i < prescriptionDrugListAttr.length; i++){
            if(isEmpty(prescriptionDrugListAttr[i].drugName)){
                Toast.info('请输入药品名称',1);
                return false;
            } 
            if(isEmpty(prescriptionDrugListAttr[i].count_unit)){
                Toast.info('请输入药品规格',1);
                return false;
            } 
            if(isEmpty(prescriptionDrugListAttr[i].count)){
                Toast.info('请输入药品数量',1);
                return false;
            }
        }
        return true
    }

    componentDidMount(){
        if(this.state.orderNo !== '0'){
            this.getPrescriptionSignatureInfoAjax()
        }else{
            var prescriptionDrugList = [];
            prescriptionDrugList[0] = {
                norms: '', 
                drugName: '', 
                count: '', 
                count_unit: ''
            }
            this.setState({
                prescriptionDrugList: prescriptionDrugList
            })
            
        } 
    }
    //提交信息
    editSubmit(){
        if(this.state.prescriptionSignature.blTime === '' || this.state.prescriptionSignature.blTime === undefined){
            Toast.info('请填写日期',2);
           return false; 
        }
        if(this.state.prescriptionSignature.userName === ''|| this.state.prescriptionSignature.userName === undefined){
            Toast.info('请填写就诊人',2);
           return false; 
        }
        if(this.state.prescriptionSignature.sfzh === '' || this.state.prescriptionSignature.sfzh === undefined){
            Toast.info('请填写身份证',2);
           return false; 
        }
        if(this.state.prescriptionSignature.mobile === ''|| this.state.prescriptionSignature.mobile === undefined){
            Toast.info('请填写电话号码',2);
           return false; 
        }
        
        var formData = new FormData();
        const prescriptionDrugList = this.state.prescriptionDrugList;
        const prescriptionSignatureObj = this.state.prescriptionSignature;

        //校验编辑或新增
        var orderNo = '';
        if(this.props.match.params.orderNo === '0'){
            orderNo = '';
        }else{
            orderNo = this.props.match.params.orderNo
        }

        this.prescriptionDrugListShuan();
        //是否是新选图片
        var pcLoadUrlFiles;
        if(this.state.pcLoadUrlFile === null){
            pcLoadUrlFiles = prescriptionSignatureObj.pcLoadUrl
        }else{
            pcLoadUrlFiles = this.state.pcLoadUrlFile
        }
        console.log(pcLoadUrlFiles);
        if(pcLoadUrlFiles === '' || pcLoadUrlFiles === undefined){
            Toast.info('请上传图片',2);
           return false; 
        }
        
        formData.append('orderNo',orderNo);
        formData.append('blTime',prescriptionSignatureObj.blTime);
        formData.append('userName',prescriptionSignatureObj.userName);
        formData.append('sfzh',prescriptionSignatureObj.sfzh);
        formData.append('mobile',prescriptionSignatureObj.mobile);
        formData.append('pcLoadUrl',pcLoadUrlFiles);
        formData.append('drugStoreAccount',this.props.account);
        formData.append('drugs',JSON.stringify(prescriptionDrugList));
        saveOrUpdateServletSignatureInfo(formData).then((res)=>{
            if(res.result === '0'){
                this.props.history.push('/')
            }
        })
    }
    //获取编辑信息
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
            if(res.result === '0'){
                var prescriptionDrugList = []
                if(res.prescriptionDrugList.length === 0){
                    prescriptionDrugList[0] = {
                        norms: '', 
                        drugName: '', 
                        count: '', 
                        count_unit: ''
                    }
                }else{
                    prescriptionDrugList = res.prescriptionDrugList;
                }
                this.setState({
                    prescriptionDrugList: prescriptionDrugList,
                    prescriptionSignature: res.prescriptionSignature
                })
            }
        })
    }
}
const mapStateToProps = (state)=> {
    return {
        isLogin: state.isLogin,
        account: state.account,
        token:  state.token
    }
}
export default connect(mapStateToProps,{})(PrescriptionEdit)