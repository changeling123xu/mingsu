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
