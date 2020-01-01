import request from './axios.js'

/**
 * 微信jssdk验证
 */
export function wxGzhAuth(query) {
  var httpURL = "/dsas/wxGzh/wxGzhAuth?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 登录
 */
export function userLogin(query) {
  var httpURL = "/dsas/servlet/userLogin?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取指定药店信息及处方列表信息
 */
export function getPrescriptionOrderList(query) {
  var httpURL = "/dsas/servlet/getPrescriptionOrderList?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取处方签信息
 */
export function getPrescriptionSignatureInfo(query) {
  var httpURL = "/dsas/servlet/getPrescriptionSignatureInfo?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 删除处方签信息
 */
export function deletePrescriptionSignatureInfo(query) {
  var httpURL = "/dsas/servlet/deletePrescriptionSignatureInfo?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}


/**
 * 新增或修改处方签信息
 */
export function saveOrUpdateServletSignatureInfo(query) {
  var httpURL = "/dsas/servlet/saveOrUpdateServletSignatureInfo";
  return request({
    url: httpURL,
    method: 'post',
    data: query
  })
}
