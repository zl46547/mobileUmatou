<template>
  <div id="TK-add">
    <Navigator>
      <span slot="title">淘客助手-添加商品</span>
    </Navigator>
    <div class="content">
      <Tabs @click="tabClick">
        <Tab title="基础配置">
          <div class="base-setting-wrap">
            <div style="padding:10px 0">
              <Uploader
                v-model="form.fileList"
                :after-read="onAfterRead"
              />
            </div>
            <Field
              v-model="textArea"
              rows="4"
              autosize
              label="自动识别"
              type="textarea"
              placeholder="请输入内容"
              @change="handleChange"
            />
            <CellGroup>
              <Field
                v-model="form.note"
                rows="2"
                autosize
                label="商品备注"
                type="textarea"
                placeholder="满_①_件商品更优惠哦~ _①_件只需_②_元"
              />
              <Cell title="截止日期：">
                <template slot="right-icon">
                  <div class="sp-wrap_text" @click="deadlineModal = true">
                    <span>{{form.deadline | formateDeadline}}</span>
                    <span v-if="!form.deadline">请选择日期</span>
                    <Icon v-if="form.deadline" name="clear"
                          @click="form.deadline=null"/>
                  </div>
                  <DatePicker
                    :visible="deadlineModal"
                    title="选择日期"
                    @cancel="deadlineModal=false"
                    @confirm="datePickerComfirm"
                    v-model="form.deadline"
                  />
                </template>
              </Cell>
              <Field
                v-model="form.productName"
                required
                clearable
                label="商品名称："
                placeholder="请输入商品名称"
              />
              <Field
                v-model="form.price"
                type="number"
                required
                clearable
                label="商品原价："
                placeholder="请输入商品原价"
                @change="handlePriceChange"
              />
              <Field
                v-model="form.coupon"
                type="number"
                required
                clearable
                label="优惠券金额："
                placeholder="请输入优惠券金额"
              />
              <Field
                v-model="form.afterCouponPrice"
                type="number"
                required
                clearable
                label="券后价："
                placeholder="请输入券后价"
              />
              <Field
                v-model="form.rebateRate"
                type="number"
                required
                clearable
                label="返利比例："
                placeholder="请输入返利比例"
                @change="handleRebateRateChange"
              />
              <Field
                v-model="form.rebate"
                type="number"
                required
                clearable
                label="返利金额："
                placeholder="请输入返利金额"
              />
              <Field
                v-model="form.afterRebatePrice"
                type="number"
                required
                clearable
                label="到手价："
                placeholder="请输入到手价"
              />
              <Cell title="是否是首单：">
                <VSwitch slot="right-icon"
                         v-model="form.isFirstOrder"
                         size="24px"
                         active-color="#07c160" inactive-color="#ddd"
                />
              </Cell>
            </CellGroup>
          </div>
        </Tab>
        <Tab title="预览">
          <div class="preview">
            <div id="preview-wrap">
              <div class="preview-pic-list">
                <img :src="item.url" v-for="item in form.fileList" :key="item.url" alt="">
              </div>
              <div class="product-info">
                <p class="product-name">{{form.productName}}</p>
                <p class="price-container" v-if="!form.isFirstOrder">
                  <span class="price-label">原价</span>
                  <span class="price">¥{{form.price}}</span>
                </p>
                <div class="price-container" v-else>
                  <span class="first-order-tag">首单</span>
                  <div class="coupon-after-price">
                    <span>¥</span>
                    <span>{{form.price | getInteger}}.</span>
                    <span class="decimal">{{form.price | getDecimal}}</span>
                  </div>
                </div>
                <div class="coupon-after-container coupon-after-container-bt">
                  <div class="tag">
                    <p>券</p>
                    <p>{{form.coupon}}元</p>
                  </div>
                  <div class="coupon-after-label">
                    付费价
                  </div>
                  <div class="coupon-after-price">
                    <span>¥</span>
                    <span>{{form.afterCouponPrice | getInteger}}.</span>
                    <span class="decimal">{{form.afterCouponPrice | getDecimal}}</span>
                  </div>
                </div>
                <div class="coupon-after-container">
                  <div class="tag">
                    <p>返</p>
                    <p>{{form.rebate}}元</p>
                  </div>
                  <div class="coupon-after-label">
                    到手价
                  </div>
                  <div class="coupon-after-price">
                    <span>¥</span>
                    <span>{{form.afterRebatePrice | getInteger}}.</span>
                    <span class="decimal">{{form.afterRebatePrice | getDecimal}}</span>
                  </div>
                </div>
              </div>
            </div>
            <img id="preview-img" src="" alt="">
          </div>
          <div class="save-btn-wrap">
            <Button type="primary" @click="saveAsImage">生成图片</Button>
            <Button type="info" @click="toList">查看列表</Button>
            <Button type="warning" @click="toActivity">查看活动主页</Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import DatePicker from '../../common/DatePicker'
  import {
    Icon,
    Overlay,
    Switch,
    Uploader,
    Field,
    Cell,
    CellGroup,
    Button,
    Tab,
    Tabs,
    Dialog,
    Toast
  } from 'vant'
  import html2canvas from 'html2canvas'
  import * as types from '../../vuex/types'
  import {addProduct, upload, updateProduct, getProductDetail} from './service'
  import dayjs from 'dayjs'

  export default {
    components: {
      Icon,
      DatePicker,
      Tab,
      Tabs,
      Navigator,
      VSwitch: Switch,
      Uploader,
      Field,
      Cell,
      CellGroup,
      Button,
      Overlay,
      Toast
    },
    created() {
      let {id} = this.$route.query
      if (id) {
        getProductDetail(id).then(res => {
          this.form = res
        })
      }
    },
    data() {
      return {
        saveStatus: false,
        textArea: '',
        deadlineModal: false,
        form: {
          deadline: new Date(),
          fileList: [],
          productName: '',
          price: '',
          coupon: '',
          code: '',
          afterCouponPrice: '',
          rebateRate: '',
          rebate: '',
          afterRebatePrice: '',
          isFirstOrder: false,
          note: ''
        }
      }
    },
    filters: {
      formateDeadline(value) {
        if (!value) {
          return null
        }
        return dayjs(value).format('YYYY-MM-DD')
      },
      getInteger(value) {
        value = Number(value).toFixed(2).split('.')
        return value[0]
      },
      getDecimal(value) {
        value = Number(value).toFixed(2).split('.')
        return value[1]
      },
      formatImage(value) {
        if (value) {
          return value.content
        }
        return null
      }
    },
    methods: {
      toActivity() {
        if (this.saveStatus) {
          this.$router.push({
            name: '活动主页',
            query: {customerGuid: 'e20d8d0d-eaf3-12d4-b4a525b5ba8e'}
          })
          return false
        }
        Dialog.confirm({
          title: '提示',
          message: '内容未保存，是否继续？'
        }).then(() => {
          this.$router.push({
            name: '活动主页',
            query: {customerGuid: 'e20d8d0d-eaf3-12d4-b4a525b5ba8e'}
          })
        })
      },
      toList() {
        if (this.saveStatus) {
          this.$router.push({name: '淘客商品列表'})
          return false
        }
        Dialog.confirm({
          title: '提示',
          message: '内容未保存，是否继续？'
        }).then(() => {
          this.$router.push({name: '淘客商品列表'})
        })
      },
      onAfterRead(file) {
        let formdata = new FormData()// 创建form对象
        this.createImage(file.file, (afterCompress) => {
          formdata.append('file', afterCompress)
          this.onUpload(formdata)
        })
      },
      onUpload(formdata) {
        upload(formdata).then(res => {
          res.forEach(item => {
            this.form.fileList.pop()
          })
          this.form.fileList = this.form.fileList.concat(res)
        })
      },
      // 图片上传
      createImage(file, cb) {
        let reader = new FileReader()
        let self = this
        reader.onload = e => {
          let result = e.target.result
          let img = new Image()
          img.src = result
          if (result.length / 1024 > 50) {
            img.onload = function () {
              // 0.1为压缩的程度，数值越小，压缩的文件越小，图片也会越模糊
              cb(self.compress(img, 0.1))
            }
          } else {
            cb(result)
          }
        }
        // 读取图像
        reader.readAsDataURL(file)
      },
      // 压缩图片
      compress(img, size) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let width = img.width
        let height = img.height
        canvas.width = width
        canvas.height = height
        // 铺底色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, width, height)
        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', size)
        return ndata
      },
      datePickerComfirm(val) {
        this.form.deadline = val
        this.deadlineModal = false
      },
      tabClick(name) {
        let image = document.querySelector('#preview-img')
        if (image && name === 1) {
          image.src = ''
        }
      },
      saveAsImage() {
        try {
          this.$store.commit(types.SET_LOADING, true)
          html2canvas(document.querySelector('#preview-wrap'), {
            useCORS: true,
            backgroundColor: null
          }).then(canvas => {
            let image64 = canvas.toDataURL('image/png', 1)
            let image = document.querySelector('#preview-img')
            image.src = image64
            this.$store.commit(types.SET_LOADING, false)
            let {id} = this.$route.query
            if (id) {
              updateProduct({
                id,
                ...this.form
              })
            } else {
              addProduct(this.form)
            }
            this.saveStatus = true
          })
        } catch (e) {
          console.log(e)
        }
      },
      handleChange({target: {value}}) {
        let emptyValue = value.split(/\n|\r/)
        if (!emptyValue[4].match(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/)) {
          Toast.fail('请输入佣金比例')
          this.textArea = ''
          return false
        }
        this.form.productName = emptyValue[0].replace(/【包邮】/g, '')
        this.form.price = emptyValue[1].replace(/(【在售价】|元)/g, '')
        this.form.afterCouponPrice = emptyValue[2].replace(/(【券后价】|元)/g, '')
        this.form.coupon = parseInt(this.form.price - this.form.afterCouponPrice)
        this.form.rebateRate = emptyValue[4]
        this.form.rebate = Number(this.form.afterCouponPrice * emptyValue[4] * 0.7).toFixed(2)
        this.form.afterRebatePrice = (this.form.afterCouponPrice - this.form.rebate).toFixed(2)
        this.form.code = emptyValue[6]
      },
      handlePriceChange() {
        this.form.afterCouponPrice = (this.form.price - this.form.coupon).toFixed(2)
      },
      handleRebateRateChange() {
        this.form.afterRebatePrice = (this.form.afterCouponPrice * (1 - 0.7 * this.form.rebateRate)).toFixed(2)
      }
    }
  }
</script>

<style lang="less" scoped>

  #TK-add {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .content {
      margin-top: 4rem;
      padding: 0 2rem;
      flex: 1;
      background-color: #fff;
      overflow-y: auto;

      .base-setting-wrap {
        margin-top: 1rem;
        max-height: calc(100vh - 10rem);
        overflow: auto;
      }

      .preview {
        background-color: #ddd;
        max-height: calc(100vh - 15rem);
        overflow: auto;
        position: relative;

        #preview-img {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 9;
        }

        #preview-wrap {
          background-color: #fff;
          margin: 20px;
          border-radius: 5px;

          .preview-pic-list {
            display: flex;
            flex-wrap: wrap;
            font-size: 0;

            img:nth-of-type(1) {
              width: 100%;
              height: 30rem;
            }

            img:nth-of-type(2), img:nth-of-type(3) {
              width: 50%;
              height: 15rem;
            }
          }

          .product-info {
            padding: 16px;

            .product-name {
              font-size: 1.8rem;
              color: #333;
              margin-bottom: 10px;
            }

            .price-container {
              margin-bottom: .5rem;
              display: flex;
              align-items: center;

              .first-order-tag {
                display: inline-block;
                border: 1px solid #f00000;
                color: #f00000;
                border-radius: 3px;
                margin-right: 14px;
                text-align: center;
                font-size: 1.4rem;
                width: 38px;
                padding: 3px;
              }

              .first-order-price {
                color: #ff3a00;
                font-size: 1.4rem;
              }

              .price, .price-label {
                color: #ccc;
                font-size: 1.6rem;
              }

              .price {
                text-decoration: line-through;
              }
            }

            .coupon-after-container {
              display: flex;
              align-items: center;
            }

            .coupon-after-container-bt {
              margin-bottom: .5rem;
            }

            .tag {
              display: flex;
              border-radius: 3px;
              border: 1px solid #ff3a00;
              margin-right: 14px;

              p {
                height: 3rem;
                line-height: 3rem;
                text-align: center;
                font-size: 1.4rem;

                &:first-of-type {
                  width: 3rem;
                  background-color: #ff3a00;
                  color: #fff;
                }

                &:last-of-type {
                  width: 5rem;
                  color: #ff3a00;
                }
              }
            }

            .coupon-after-label {
              font-size: 1.6rem;
              color: #333;
              margin-right: 5px;
            }

            .coupon-after-price {
              display: flex;
              align-items: baseline;
              color: #ff3a00;
              font-size: 2.4rem;
              font-weight: 400;

              span:first-of-type {
                font-size: 1.4rem;
                margin-right: 2px;
              }

              .decimal {
                font-size: 1.4rem;
              }
            }
          }
        }
      }

      .save-btn-wrap {
        margin-top: 10px;
        text-align: center;
      }
    }
    .sp-wrap_text {
      display: flex;
      align-items: center;
    }
    .van-icon-clear {
      font-size: 1.6rem;
      margin-left: 5px;
      color: #aaa;
    }
    .van-cell__title {
      width: 90px;
      flex: none;
    }
    .van-uploader__preview {
      position: relative;
      margin: 8px !important;
    }
  }
</style>
