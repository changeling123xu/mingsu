import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getRenterList(params) {
  return request({
    url: '/api/table/list',
    method: 'get',
    params
  })
}

export function updatedRenterMessage(data) {
  return request({
    url: '/api/table/renter',
    method: 'post',
    data
  })
}

export function deleteRenter(params) {
  return request({
    url: '/api/table/delete',
    method: 'get',
    params
  })
}
// ---------------------------房源相关-------------------------------

export function getHouseList(params){
  return request({
    url: '/api/table/getHouse',
    method: 'get',
    params
  })
}

export function getHouseAllServer(params){
  return request({
    url: '/api/table/getHouseAllServer',
    method: 'get',
    params
  })
}

export function setUpdateHouse(data){
  return request({
    url: '/api/table/updateHouse',
    method: 'post',
    data
  })
}
