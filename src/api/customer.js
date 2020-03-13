import request from '@/utils/request'

export function getCustomerList(params) {
  return request({
    url: '/api/customer/list',
    method: 'get',
    params
  })
}

export function getRenterMessage(params){
  return request({
    url:'/api/user/rent_message',
    method: 'get',
    params
  })
}
