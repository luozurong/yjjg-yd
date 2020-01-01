import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import detail from './css/prescriptionDetail.module.css'
import logojian from '../common/images/logojian.png'
import official_seal from '../common/images/official_seal.png'
import rp from '../common/images/rp.png'

import { getPrescriptionSignatureInfo } from '../common/js/resource'

class PrescriptionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptionDrugList: [],
            prescriptionSignature: {}
        }
        console.log(props)
    }
    render() {
        if (!this.props.isLogin) {
            return <Redirect to="/login" />
        }
        const details = this.state.prescriptionSignature;
        var blTime;
        if (details.blTime) {
            const blTimeString = details.blTime;
            console.log(blTimeString);
            blTime = blTimeString.slice(0, 11)
        } else {
            blTime = ''
        }

        return (
            <div className={detail.prescriptionDetail}>
                <DocumentTitle title="查看药店处方"></DocumentTitle>
                <div className={detail.prescriptionDetailheight}></div>
                <div className={detail.prescriptionDetailshadow}>
                    <div className={detail.prescriptionDetailheadwrap}>
                        <div className={detail.prescriptionDetailhead}>
                            <img className={detail.prescriptionDetailheadlogo} src={logojian} alt="" />
                            <img className={detail.prescriptionDetailheader} src={details.barCodeUrl} alt="" />
                        </div>
                        <div className={detail.prescriptionDetailword}>处方笺</div>
                        <div className={detail.prescriptionDetailline}></div>
                        <img className={detail.prescriptionDetailzhang} src={official_seal} alt="" />
                    </div>
                    <div className={detail.prescriptionDetailwrap}>
                        <div>
                            <span>费别：</span>
                            <span className={[detail.line, detail.prescriptionDetailline1].join(' ')}>自费</span>
                            <span>医疗证/医保卡号：</span>
                            <span className={[detail.line, detail.prescriptionDetailline2].join(' ')}>{details.sbcardNo}</span>
                        </div>
                        <div>
                            <span>姓名：</span>
                            <span className={[detail.line, detail.prescriptionDetailline3].join(' ')}>{details.userName}</span>
                            <span>性别：</span>
                            <span className={[detail.line, detail.prescriptionDetailline4].join(' ')}>{details.sex === 1 ? '男' : '女'}</span>
                            <span>年龄：</span>
                            <span className={[detail.line, detail.prescriptionDetailline5].join(' ')}>{details.age}岁</span>
                            <span>就诊卡号：</span>
                            <span className={[detail.line, detail.prescriptionDetailline6].join(' ')}>{details.cardNo}</span>
                        </div>
                        <div>
                            <span>科别：</span>
                            <span className={[detail.line, detail.prescriptionDetailline7].join(' ')}>{details.blDepartment}</span>
                            <span>诊号：</span>
                            <span className={[detail.line, detail.prescriptionDetailline8].join(' ')}>{details.blNo}</span>
                            <span>开方日期：</span>
                            <span className={[detail.line, detail.prescriptionDetailline9].join(' ')}>{blTime}</span>
                        </div>
                        <div>
                            <span>临床诊断：</span>
                            <span className={[detail.line, detail.prescriptionDetailline10].join(' ')}>{details.diagnoseDetail}</span>
                        </div>
                        <div>
                            <span>住址/电话：</span>
                            <span className={[detail.line, detail.prescriptionDetailline11].join(' ')}>{details.address}/{details.mobile}</span>
                        </div>
                        <div>
                            <span>协议药店：</span>
                            <span className={[detail.line, detail.prescriptionDetailline10].join(' ')}>{details.drugstoreName}</span>
                        </div>
                    </div>
                    <div className={detail.prescriptionDetailrp}>
                        <img src={rp} alt="" />
                    </div>
                    <div className={detail.prescriptionDetaildrup}>
                        {
                            this.state.prescriptionDrugList.map((list, index) => {
                                return (
                                    <div key={index} className={detail.prescriptionDetaildrupitem}>
                                        <div className={detail.prescriptionDetaildrupname}>
                                            <span>{index + 1}、{list.drugName}</span>
                                            <span>{list.norms}*{list.count} {list.count_unit}</span>
                                        </div>
                                        <div className={detail.prescriptionDetaildrupuse}>用法：{list.dosage}  {list.useage}</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className={detail.prescriptionDetailempty}>
                        <i></i>
                        <span>以下为空</span>
                        <i></i>
                    </div>
                    <div className={detail.prescriptionDetailtip}>注：{details.descr}</div>
                    <div className={detail.prescriptionDetailcontainer}>
                        <div className={detail.prescriptionDetailcontaineritem}>
                            <span>公费记账：</span>
                            <span className={[detail.line, detail.prescriptionDetailline12].join(' ')}></span>
                            <span className={detail.prescriptionDetailyuan}>元</span>
                            <span>付现：</span>
                            <span className={[detail.line, detail.prescriptionDetailline13].join(' ')}></span>
                            <span className={detail.prescriptionDetailyuan}>元</span>
                            <span>药品金额：</span>
                            <span className={[detail.line, detail.prescriptionDetailline14].join(' ')}></span>
                            <span>元</span>
                        </div>
                        <div className={detail.prescriptionDetailcontaineritem}>
                            <span>医师：</span>
                            <span className={[detail.line, detail.prescriptionDetailline15].join(' ')}>
                                <span>{details.doctorName}</span>
                                <img src={details.doctorSign} alt="" />
                            </span>
                            <span>审方：</span>
                            <span className={[detail.line, detail.prescriptionDetailline16].join(' ')}></span>
                        </div>
                        <div className={detail.prescriptionDetailcontaineritem}>
                            <span>调配：</span>
                            <span className={[detail.line, detail.prescriptionDetailline17].join(' ')}></span>
                            <span>核对发药：</span>
                            <span className={[detail.line, detail.prescriptionDetailline18].join(' ')}>
                                <img src={details.medicineManSign} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className={detail.prescriptionDetailtiplast}>注意：根据《互联网医院管理办法（试行）》规定，处方仅限本协议药店有效，自行下载不具有处方效力。为确保用药安全，处方三日内有效。</div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getPrescriptionSignatureInfoAjax()
    }

    getPrescriptionSignatureInfoAjax() {
        var params = {
            body: {
                orderNo: this.props.match.params.orderNo,
                fromType: 2
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        }
        getPrescriptionSignatureInfo(params).then((res) => {
            console.log(res);
            if (res.result === '0') {
                this.setState({
                    prescriptionDrugList: res.prescriptionDrugList,
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
export default connect(mapStateToProps, {})(PrescriptionDetail)