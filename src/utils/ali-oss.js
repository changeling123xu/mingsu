// 引入ali-oss
let OSS = require('ali-oss')

/**
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域， 默认oss-cn-hangzhou。
 * 用户登录名称 mingsu01@1915673482256440.onaliyun.com
AccessKey ID LTAI4FhZ86nJ3jtALTg9XVto
AccessKeySecret BRa6xAvG4waFK0XpacAzMjdoK64qRf
 */
let client = new OSS({
  region: 'oss-cn-chengdu',
  // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: 'LTAI4FhZ86nJ3jtALTg9XVto',
  accessKeySecret: 'BRa6xAvG4waFK0XpacAzMjdoK64qRf',
  bucket: 'xusu'
})

/**
 *  上传文件，大小不能超过5GB
 * @param {string} ObjName OSS的储存路径和文件名字
 * @param {string} fileUrl 本地文件
 *
 * @retruns Promise
 */
export const put = async (ObjName, fileUrl) => {
  try {
    let result = await client.put(`mingsu/${ObjName}`, fileUrl)
    // AAA为文件夹， ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径
    console.log(result)
    return result
  } catch (e) {
    console.log(e)
  }
}

// export const delet = async (ObjName, fileUrl) => {
//   try {
//     let result = await client.put(`mingsu/${ObjName}`, fileUrl)
//     // AAA为文件夹， ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径
//     console.log(result)
//     return result
//   } catch (e) {
//     console.log(e)
//   }
// }

export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${rx()}${rx()}`
}
