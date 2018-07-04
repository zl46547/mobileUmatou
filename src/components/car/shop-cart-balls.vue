<template>
  <div class="ball-container">
    <transition name="fade" v-for="(ball,i) in balls" :key="i" @before-enter="beforeEnter" @enter="enter"
                @after-enter="afterEnter">
      <div class="ball" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      }
    },
    methods: {
      drop(el) {
        // 触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) { // 将false的小球放到dropBalls
            ball.show = true
            ball.el = el // 设置小球的el属性为一个dom对象
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) { // 这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect() // 获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 32
            if (rect.left > 674.671875) {
              x = 674.671875 - 32
            }
            let y = -(window.innerHeight - rect.top - 160) // 负数,因为是从左上角往下的的方向
            el.style.display = '' // 清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            // 处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el, done) { // 这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight // 触发重绘html
        this.$nextTick(() => { // 让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          // 处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。
        })
      },

      afterEnter(el) { // 这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false
          el.style.display = 'none' // 隐藏小球
          el.addEventListener('transitionend', () => {
            this.listenInCart()
          })
//          el.children[0].addEventListener('webkitAnimationEnd', () => {
//            this.listenInCart()
//          })
        }
      },
      // 监听圆点是否进入购物车
      listenInCart() {
        this.receiveInCart = true
        this.$emit('receive', true)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .ball-container {
    .ball {
      position: absolute;
      left: 10px;
      bottom: 22px;
      z-index: 200;
      transition: all .58s cubic-bezier(0.49, -0.69, 0.75, 0.41);
      .inner {
        width: 4vw;
        height: 4vw;
        border-radius: 50%;
        background: rgb(220, 40, 30);
        transition: all .6s linear;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .ball-container {
      .ball {
        left: 32px;
        bottom: 22px;
        transition: all .5s cubic-bezier(0.49, -0.69, 0.75, 0.41);
        .inner {
          width: 22px;
          height: 22px;
          transition: all .5s linear;
        }
      }
    }
  }
</style>
