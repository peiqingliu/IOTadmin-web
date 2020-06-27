import request from '@/utils/request'

export function getAllKdgHousingEstate() {
  return request({
    url: 'api/express/kdgHousingEstate/getAll',
    method: 'get'
  })
}
