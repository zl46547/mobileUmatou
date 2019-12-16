import {
  addProductRequest,
  deleteProductsRequest,
  getProductsRequest
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 添加商品
 * @param data
 */
export const addProduct = async data => {
  try {
    let res = await addProductRequest(data)
    if (res.data.Data) {
      Toast.success('添加成功')
      return res.data.Data
    }
    Toast.fail('添加失败')
  } catch (e) {
    console.error(e)
  }
}
/**
 * 删除商品
 * @param data
 */
export const deleteProducts = async data => {
  try {
    let res = await deleteProductsRequest(data)
    if (res.data.Data) {
      Toast.success('删除成功')
      return res.data.Data
    }
    Toast.fail('编辑失败')
  } catch (e) {
    console.error(e)
  }
}
// /**
//  * 编辑商品
//  * @param data
//  */
// export const updateAddress = async data => {
//   try {
//     let res = await updateAddressRequest(data)
//     if (res.data.Data) {
//       Toast.success('编辑成功')
//       return res.data.Data
//     }
//     Toast.fail('编辑失败')
//   } catch (e) {
//     console.error(e)
//   }
// }
/**
 * 查询商品列表
 * @param id
 */
export const getProducts = async id => {
  try {
    let res = await getProductsRequest(id)
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}
