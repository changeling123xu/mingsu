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
