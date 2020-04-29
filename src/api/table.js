import request from '@/utils/request';
// ----------------------------------订单
export function getAllHouseOrder(params) {
  return request({
    url: '/web-dev/houseOrder/getAllHouseOrder',
    method: 'get',
    params
  });
}

// ----------------------------------各省房源存量
export function getHouseCount(params) {
  return request({
    url: '/web-dev/houseAbout/getHouseCount',
    method: 'get',
    params
  });
}

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  });
}

export function getRenterList(params) {
  return request({
    url: '/api/table/list',
    method: 'get',
    params
  });
}

export function updatedRenterMessage(data) {
  return request({
    url: '/api/table/renter',
    method: 'post',
    data
  });
}

export function deleteRenter(params) {
  return request({
    url: '/api/table/delete',
    method: 'get',
    params
  });
}
// ---------------------------房源相关-------------------------------

export function getHouseList(params) {
  return request({
    url: '/api/table/getHouses',
    method: 'get',
    params
  });
}
// export function getHouseList(params) {
//   return request({
//     url: '/api/table/getHouse',
//     method: 'get',
//     params
//   });
// }/api/table/deleteHouseImage

export function getHouseAllServer(params) {
  return request({
    url: '/api/table/getHouseAllServer',
    method: 'get',
    params
  });
}

export function setUpdateHouse(data) {
  return request({
    url: '/api/table/updateHouse',
    method: 'post',
    data
  });
}

export function deleteHouse(data) {
  return request({
    url: '/api/table/deleteHouse',
    method: 'post',
    data
  });
}

export function deleteHouseImage(data) {
  return request({
    url: '/api/table/deleteHouseImage',
    method: 'post',
    data
  });
}
