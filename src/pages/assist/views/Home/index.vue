<template>
    <div id="help-each">
        <div class="content">
            <Button @click="beforeAdd" type="info">
                <i class="iconfont icon-add"></i>
                添加口令
            </Button>
            <div class="empty-list">
                <i class="iconfont icon-empty" v-if="table.length<=0"></i>
                <p>暂无数据~</p>
            </div>
            <List
                    finished-text="没有更多了"
            >
                <div class="list-item"
                     v-for="item in table"
                     :key="item._id"
                >
                    <div class="user-info van-hairline--bottom">
                        <img :src="item.nickPic" alt="头像">
                        <h2 class="">{{item.nickName}}</h2>
                    </div>
                    <p>{{item.note}}</p>
                    <p class="remain-time">剩余 <span>{{getRemainDays(item.create_time)}}</span> 天自动下架</p>
                    <div class="copy-user">
                        <p>今日助力：<span v-if="getPicList(item).length<=0">无人助力啊( ´◔ ‸◔`)</span></p>
                        <div class="nick-pic-list">
                            <img :src="user.nickPic[0].url"
                                 alt="助力头像"
                                 v-for="user in getPicList(item)"
                                 :key="user.nickName"
                            >
                        </div>
                    </div>
                    <div class="operate-bottom">
                        <Button type="primary" @click="handleCopyCode(item)">复制口令</Button>
                        <Button type="info"
                                @click="handleDelete(item._id)"
                                v-if="helpEachUser.nickName === item.nickName"
                        >删除口令</Button>
                        <Button type="info"
                                @click="handleShare(item._id)"
                                v-if="helpEachUser.nickName === item.nickName"
                        >口令分享</Button>
                    </div>
                </div>
            </List>
        </div>
        <VDialog title="添加淘口令"
                 v-model="showAdd"
                 show-cancel-button
                 @confirm="handleAdd"
        >
            <Field
                    required
                    clearable
                    v-model="note"
                    rows="2"
                    label-width="60px"
                    autosize
                    label="淘口令"
                    type="textarea"
                    placeholder="请输入淘口令"
            />
        </VDialog>
    </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */

  import {List, Button, Toast, Dialog, Field} from 'vant'
  import {getProducts, deleteProducts, addProduct, copyCode} from './service'
  import copy from 'copy-to-clipboard'
  import dayjs from 'dayjs'
  import ShareConfig from '../../../../util/share'

  export default {
    components: {
      Field,
      List,
      Button,
      VDialog: Dialog.Component
    },
    data() {
      return {
        table: [],
        showAdd: false,
        helpEachUser: '',
        note: '',
        timeout: 0
      }
    },
    created() {
      this.initTable()
      const shareParams = {
        title: '标题',
        desc: '描述',
        link: `${window.location.origin}${window.location.pathname}#/`,
        imgUrl: 'https://www.baidu.com/img/flexible/logo/pc/result@2.png' || ''
      }
      ShareConfig.init(
        shareParams,
        this.shareSuccess
      ).execute()
    },
    methods: {

      shareSuccess (status, data) {
        if (status) {
          this.$toast({ type: "success", message: `分享${data.type}成功！` })
        }
      },
      beforeAdd(){
        let helpEachUserStr = localStorage.getItem('helpEachUser')
        this.helpEachUser = helpEachUserStr ? JSON.parse(helpEachUserStr) : null
        if (!this.helpEachUser) {
          this.$router.push({path: '/addUser'})
          return false
        }
        this.showAdd = true
      },
      getPicList(item) {
        let nowDay = dayjs().format('YYYY-MM-DD')
        if (item.helpFriends && item.helpFriends[nowDay]) {
          return item.helpFriends[nowDay]
        }
        return []
      },
      getRemainDays(time) {
        return 5 - dayjs().diff(dayjs(time), 'days')
      },
      /**
       * 复制淘口令
       */
      handleCopyCode(item) {
        if (this.timeout !== 0) {
          Toast.fail('操作太快了')
          return false
        }
        this.timeout = 10
        copyCode({
          id: item._id,
          helpEachUser: this.helpEachUser
        }).then(() => {
          this.initTable()
          copy(item.note)
          setTimeout(() => {
            this.timeout = 0
          }, 10000)
        })
      },
      /**
       * 初始化表格数据
       */
      initTable() {
        getProducts().then(res => {
          this.table = res
        })
      },
      /**
       * 删除
       */
      handleDelete(id) {
        deleteProducts({id}).then(() => {
          this.initTable()
        })
      },
      /**
       * 新增
       */
      handleAdd() {
        if (!this.note) {
          Toast.fail('口令不能为空')
          return false
        }
        let nickNameList = this.table.map(item => item.nickName)
        if (nickNameList.includes(this.helpEachUser.nickName)) {
          Toast.fail({
            duration: 2000,
            message: '您已添加淘口令，请删除后重试'
          })
          return false
        }
        addProduct({
          nickName: this.helpEachUser.nickName,
          nickPic: this.helpEachUser.nickPic[0].url,
          note: this.note
        }).then(() => {
          this.initTable()
        })
      }
    }
  }
</script>

<style lang="less" scoped>

    #help-each {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        .content {
            padding: 2rem;
            flex: 1;
            background-color: #fff;
            overflow-y: auto;
            .empty-list{
                position: absolute;
                color: #ccc;
                top: 50%;
                left: 50%;
                transform:translate(-50%,-50%);
                .icon-empty{
                    font-size: 10rem;
                }
                p{
                    text-align: center;
                    transform:translateX(-10%);
                    margin-top: 5px;
                    font-size: 1.3rem;
                }
            }
            .user-info{
                display: flex;
                align-items: center;
                padding: 1rem;
                img{
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    margin-right: .5rem;
                }
            }
            .copy-user{
                padding: 1rem;
                >p{
                    font-size: 1.3rem;
                    margin-bottom: .3rem;
                }
                .nick-pic-list{
                    display: flex;
                    align-items: center;
                    img{
                        margin-right: .5rem;
                        display: block;
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 50%;
                    }
                }
            }
            .list-item {
                margin-top: 2rem;
                border-radius: 5px;
                box-shadow: 0 0 10px #d2d2d2;
                font-size: 1.3rem;
                >p{
                    padding: 1rem;
                    span{
                        font-size: 1.8rem;
                        color: red;
                        font-weight: bold;
                    }
                }
                .operate-bottom{
                    padding: 1rem;
                    text-align: center;
                }
            }
        }
    }
</style>
