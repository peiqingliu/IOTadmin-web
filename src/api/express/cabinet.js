import request from '@/utils/request'

export function getAllCabinet() {
  const params = {
    page: 0,
    size: 9999,
    enabled: true
  }
  return request({
    url: 'api/kdgExpCabinet',
    method: 'get',
    params
  })
}

export function add(data) {
  debugger
  return request({
    url: 'api/kdgExpCabinet/save',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/kdgExpCabinet',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/kdgExpCabinet',
    method: 'put',
    data
  })
}

export default { add, edit, del }
