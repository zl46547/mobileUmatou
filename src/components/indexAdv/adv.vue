<template>
  <div v-if='adverise' id="adverise">
    <div id="top" class="cover">
      <img :src="adverise.coverImg" alt="">
    </div>
    <div class="banners" v-if="adverise.banners.length>0">
      <router-link :to="{ name: '商品详情',params:{'id':item.productId}}" v-for="(item,i) in adverise.banners" :key="i">
        <img :src="item.images" alt="">
      </router-link>
    </div>
    <div class="sections" v-if="adverise.sections.length>0">
      <div class="sectionItem" v-for="(section,i) in adverise.sections" :key="i">
        <img :src="section.images" alt="" v-if="section.images">
        <div class="contentList">
          <div v-for="obj in section.dataList" :key="obj.ProductId">
            <div class="productItem" :class="{'width-50':section.type == 2,'width-33':section.type == 3}">
              <router-link :to="{ name: '商品详情',params:{'id':obj.ProductId}}">
                <img :src="obj.PictureUrl" alt="">
              </router-link>
              <div class="price">
                <div class="newestPrice">
                  <span>¥</span>
                  <span>{{obj.PeriodMoney}}</span>
                  <span>/{{obj.Unit}}</span>
                </div>
                <div class="defaultPrice">
                  <span>¥&nbsp;{{obj.DefaultMoney}}</span>
                </div>
              </div>
              <div class="addCart-btn" :style="{'background-color':adverise.btnColor}" @click="addTocart(obj)">
                <p>加入购物车</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="backtop">
      <a @click="goToTop()"><img :src="adverise.backtop" alt="回到顶部" style=""></a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import addCartUtil from '../../util/addCart'

  export default {
    props: ['adverise'],
    methods: {
      /**
       * 回到顶部
       */
      goToTop () {
        let timer = setInterval(() => {
          var top = document.getElementsByClassName('content-body')[0].scrollTop
          let speed = Math.ceil(top / 5)
          document.getElementsByClassName('content-body')[0].scrollTop = top - speed
          if (top === 0) {
            clearInterval(timer)
          }
        }, 20)
      },
      /**
       * 加入购物车
       * @param productInfo
       */
      addTocart (productInfo) {
        addCartUtil.addCart(productInfo)
      }
    }
  }
</script>

<style lang="less" scoped>
  #adverise {
    height:92vh;
    margin-top: 8vh;
    .cover {
      img {
        width: 100vw;
      }
    }
    .banners {
      img {
        width: 100vw;
      }
    }
    .sections {
      .sectionItem {
        > img {
          width: 100vw;
        }
        .contentList {
          display: flex;
          flex-wrap: wrap;
          .width-50 {
            width: 48vw;
          }

          .width-33 {
            width: 31.3vw;
          }
          .productItem {
            margin: 1vh 1vw;
            background-color: #fff;
            border-radius: 10px;
            img {
              width: 100%;
              border-radius: 10px 10px 0 0;
            }
            .price {
              display: flex;
              align-items: baseline;
              justify-content: space-between;
              padding: 1vh 2vw;
              .newestPrice {
                display: flex;
                white-space: nowrap;
                align-items: baseline;
                color: #ff718e;
                font-size: 2.8vw;
                span:nth-of-type(2) {
                  font-size: 3.8vw;
                }
              }
              .defaultPrice {
                span {
                  font-size: 2.8vw;
                  color: #aaa;
                  text-decoration: line-through;
                }
              }
            }
            .addCart-btn {
              display: flex;
              height: 6vh;
              width: 100%;
              cursor: pointer;
              border-radius: 0 0 10px 10px;
              p {
                font-size: 4.2vw;
                color: #fff;
                margin: auto;
              }
            }
          }
        }
      }
    }
    .backtop {
      img {
        cursor: pointer;
        width: 100vw;
      }
    }
  }

  @media screen and (min-width: 640px) {
    #adverise {
      .cover {
        img {
          width: 640px;
        }
      }
      .banners {
        img {
          width: 640px;
        }
      }
      .sections {
        .sectionItem {
          > img {
            width: 640px;
          }
          .contentList {
            .width-50 {
              width: 280px;
            }

            .width-33 {
              width: 182px;
            }
            .productItem {
              margin: 15px;
              .price {
                padding: 15px 10px;
                .newestPrice {
                  font-size: 18px;
                  span:nth-of-type(2) {
                    font-size: 24px;
                  }
                }
                .defaultPrice {
                  span {
                    font-size: 20px;
                  }
                }
              }
              .addCart-btn {
                height: 70px;
                p {
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
      .backtop {
        img {
          width: 640px;
        }
      }
    }
  }
</style>
