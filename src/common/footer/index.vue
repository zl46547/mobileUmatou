<template>
  <footer id="footer" @click.stop="gotoRouter">
    <div class="tabbar">
      <div class="tabbar-item" v-for="item in tabbarItem" :key="item.name"
           :class="{'isSelected':item.url === selected}" @click="selectMenu(item.url)">
        <i :class="[`${item.icon}`]" class="iconfont"></i><br/>
        <span class="tabbar-item-name">{{item.name}}</span>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        selected: '/',
        tabbarItem: [
          {
            name: '首页',
            icon: 'icon-home',
            url: '/'
          },
          {
            name: '分类',
            icon: 'icon-category',
            url: '/category/0'
          },
          {
            name: '购物车',
            icon: 'icon-car',
            url: '/car'
          },
          {
            name: '我的',
            icon: 'icon-user',
            url: '/user'
          }
        ]
      }
    },
    methods: {
      gotoRouter () {
        this.$router.replace(this.selected)
      },
      selectMenu(val) {
        this.selected = val
        this.$store.commit('SELECT_MENU', val)
      }
    },
    mounted () {
      this.selected = this.$store.state.common.selectMenu
      let routerName = this.$route.name
      switch (routerName) {
        case '首页':
          this.selected = '/'
          break
        case '分类页':
          this.selected = '/category/0'
          break
        case '购物车页':
          this.selected = '/car'
          break
        case '用户页':
          this.selected = '/user'
          break
      }
    }
  }
</script>

<style lang="less" scoped>
  #footer {
    width: 100%;
    height: 55px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -50%;
    display: flex;
    align-items: center;
    box-shadow: 0 -0.5px 20px rgb(221, 221, 221);
    .tabbar {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      .tabbar-item {
        text-align: center;
        cursor: pointer;
        .iconfont {
          font-size: 1.5rem;
        }
        .tabbar-item-name {
          font-size: 1rem;
        }
      }
    }
    .isSelected {
      color: #55c955;
      background-color: #fff;
      font-weight:bold;
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTYXNebcAAAt4AAAAHEdERUYAKQANAAALWAAAAB5PUy8yPHdJBQAAAVgAAABWY21hcM5AzxMAAAHIAAABWmdhc3D//wADAAALUAAAAAhnbHlmCXCM7QAAAzQAAAVMaGVhZBNtlqQAAADcAAAANmhoZWEH+gOtAAABFAAAACRobXR4DcIAVAAAAbAAAAAYbG9jYQJ2BB4AAAMkAAAAEG1heHABGQDKAAABOAAAACBuYW1lKeYRVQAACIAAAAKIcG9zdCdAth8AAAsIAAAARwABAAAAAQAAgK5Ft18PPPUACwQAAAAAANgUqVcAAAAA2BSpVwAJ/4kEHANwAAAACAACAAAAAAAAAAEAAAOA/4AAXAQnAAAAAAQcAAEAAAAAAAAAAAAAAAAAAAAFAAEAAAAHAL4ACAAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQJAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5gnnCgOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAABVQAABCcACQQAACAARgArAAAAAwAAAAMAAAAcAAEAAAAAAFQAAwABAAAAHAAEADgAAAAKAAgAAgAC5gnmGeYd5wr//wAA5gnmGeYd5wr//xn6GesZ6Bj8AAEAAAAAAAAAAAAAAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAF4AfYCpgAEAAn/iQQcA3AAFQA6AEUATwAAATYyFwEWMjY0JwEuASIGBwEGFBYyNwEUBw4BIyEiLgI1ES4BIgYHER4DMyE2Nz4BNREuASIGFREFFxE+ATceARcRNxcRLgEnDgEHESEB9QsjDAG7CRgRCP5FDiUoJg3+RwkSGAkDMhsUIxL+FBUuIhcBEBgQAQEdM0MiAew/NBcWARAYEf4WHQE+MC8+AhwiAmBJSWACAVYDKgoK/kIIERgJAb4NDw8N/kAJGBEI/t08HhQUFSYxFgGPDBERDP5xIUY2HwE5F0MoAawMEREM/lSCHQEnL0ACAkAv/tkdPAFGSWABAmFH/rwAAAAACAAg/6AD4ANgABoALgBiAHYAjgCiALwAvQAAATIWFzAXHgEdARQGKwEiJic5AS4BND4CMzEXLgEiDgIUFhcxHgE7ATU0JicxASImNDY7ATIWFzAXHgEUBgcxDgEiJic5AS4BPQE0NjIWHQEUFhcxHgEyPgI0Ji8BLgEjATI+Aj0BIyIOAhQWFxUeATMxNw4BIiYnMCcuATQ+AjsBMhYdARQGBzEBIg4CHQEzMj4CNCYnMS4BIzEHPgEyFhc5AR4BFAYHMQ4BKwEiJj0BNDY3OQEBAi9THgIeIg8Jyi9THh4kJD5RL34YQEhAMBwcGBhAJLAcGAE4Cw8PC0QvUx4CHiIkHh5TXlMeHiQPFA8cGBhASEAwHBsXAhhAJP4GJEAwHLAkQDAcHBgYQCSgHlNeUR4CHiQkPFMvygsNIiABXCRAMBywJEAwHBwYGEAkoB5TXlMeHiQkHh5TL8oLDSIgA2AkHgIeUS/KCw0kHh5TXlM8JGYYHBwwQEhAGBgcsCRAGP46DxYNJB4CHlFeUx4eJCQeHlMvyAsNDwnKJEAYGBwcMEBIQBgCGBz+nhwwQCSwHDBASEAYAhcbEB4kIh4CHlNeUzwkDwnKL1EgA0wcMEAksBwwQEhAGBgcEB4kJB4eU15THh4kDwnKL1EgAAAAAAQARv/BA7kDMAAIACgARwBQAAAlHgEyNjQmIgYBMTYmJyYnIQ4BFBYzITIXFgcDDgEjBQ4BHgEzJTI2NwcuASchIiYnAycuAScjIgYUFhczMhYfARMeATMhMjYHDgEUFjI2NCYBIAElNyUlNyUClQMNDhom/eQPExMPAhwIBQkBMgEQCv5YDhICEw0BqCM1BQ4BEw7+BAkOAjUeBTUkKA4TEw4oCg8CHjUFNCMB/A4TXxwlJTclJQIcJSU3JSUCRxcrEBwBARMdEwYLEP7mCg0gARUcER8wIcsOEwEOCgF2riQuARMdEwEOC67+iyQvEy0BJTclJTclAAAAAAcAK/+aA+cDZgAEAAkADQARAFoAdAB1AAATIgc2MwE0NwYVEzAxNQcwMTUTJicmJzEmJzEmJyYnNjc2Nz4BNC4CJyMOAxQWFxYXFhcGBwYHBgcGBwYHBhYXMz4BNz4BNz4BNzMeARceARceARczPgEnASIjLgEvASY0PwE+ATczHgEXFRYUBxUOAQcj5wQCAwQCzwEBMDAdCiIGCCAuCgpMXhEPEhAqLCxTaToHOmlTLCwqEBEQEV5MCwkuIAgGIgoCDwwHCQ0BCz8wOpRUAVSUOjA/CwEMCQgMDwL+LAEBVIEWAQYGARaCVQFVghYHBxaBVAMBmQEB/uECAgEDAhIBAQH9L0tFDQ03LQoJQh4JDA0QKmt3alQsAQEsVGp3ayoQDQwJHkIJCi03DQ1FSw0TAgINCkZ8MDpCAQFCOjB8RgoNAgITDQGYAmNOBBk2GgRRaQICaVEEGjYZBE5jAgAAABIA3gABAAAAAAAAABUALAABAAAAAAABAAgAVAABAAAAAAACAAcAbQABAAAAAAADAAgAhwABAAAAAAAEAAgAogABAAAAAAAFAAsAwwABAAAAAAAGAAgA4QABAAAAAAAKACsBQgABAAAAAAALABMBlgADAAEECQAAACoAAAADAAEECQABABAAQgADAAEECQACAA4AXQADAAEECQADABAAdQADAAEECQAEABAAkAADAAEECQAFABYAqwADAAEECQAGABAAzwADAAEECQAKAFYA6gADAAEECQALACYBbgAKAEMAcgBlAGEAdABlAGQAIABiAHkAIABpAGMAbwBuAGYAbwBuAHQACgAACkNyZWF0ZWQgYnkgaWNvbmZvbnQKAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABSAGUAZwB1AGwAYQByAABSZWd1bGFyAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAABHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuAABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAABodHRwOi8vZm9udGVsbG8uY29tAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAABAAIBAgEDAQQBBQRob21lCGNhdGVnb3J5A2NhcgR1c2VyAAAAAAH//wACAAEAAAAMAAAAFgAAAAIAAQADAAYAAQAEAAAAAgAAAAAAAAABAAAAANWkJwgAAAAA2BSpVwAAAADYFKlX) format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    .iconfont {
      font-family:"iconfont";
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-category:before { content: "\e619"; }

    .icon-car:before { content: "\e61d"; }

    .icon-home:before { content: "\e609"; }

    .icon-user:before { content: "\e70a"; }
  }

  @media screen and (min-width: 640px) {
    #footer {
      width: 640px;
      margin-left: -320px;
      .tabbar {
        .tabbar-item {
          .iconfont {
            font-size: 1.8rem;
          }
          .tabbar-item-name {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>
