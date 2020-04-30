<template>
  <div id="add-user">
    <Navigator>
      <span slot="title">添加用户</span>
    </Navigator>
    <div class="content">
      <CellGroup>
        <Field
          required
          clearable
          v-model="form.nickName"
          rows="1"
          autosize
          label="微信昵称："
          type="textarea"
          placeholder="请输入昵称"
        />
        <Cell title="微信图片：" required>
          <template slot="right-icon">
            <Uploader
              v-model="form.nickPic"
              :after-read="onAfterRead"
              :max-count="1"
            />
          </template>
        </Cell>
      </CellGroup>
      <div class="save-btn-wrap">
        <Button type="primary" @click="handleSave">添加</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import {
    Overlay,
    Uploader,
    Field,
    Cell,
    CellGroup,
    Button,
    Toast
  } from 'vant'
  import {upload} from './service'

  export default {
    components: {
      Navigator,
      Uploader,
      Field,
      Cell,
      CellGroup,
      Button,
      Overlay,
      Toast
    },
    data() {
      return {
        form: {
          nickPic: [],
          nickName: ''
        }
      }
    },
    methods: {
      onAfterRead(file) {
        let formdata = new FormData()// 创建form对象
        this.createImage(file.file, (afterCompress) => {
          formdata.append('file', afterCompress)
          this.onUpload(formdata)
        })
      },
      onUpload(formdata) {
        upload(formdata).then(res => {
          this.form.nickPic = res
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
              // 0.2为压缩的程度，数值越小，压缩的文件越小，图片也会越模糊
              cb(self.compress(img, 0.2))
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
        return canvas.toDataURL('image/jpeg', size)
      },
      handleSave() {
        if (!this.form.nickName) {
          Toast.fail('昵称不能为空')
          return false
        }
        if (!this.form.nickPic) {
          Toast.fail('头像不能为空')
          return false
        }
        localStorage.setItem('helpEachUser', JSON.stringify(this.form))
        Toast.success('添加成功')
        this.$router.replace({path: '/helpEach'})
      }
    }
  }
</script>

<style lang="less" scoped>

  #add-user {
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
