<template>
  <header  @click="handleCityChange">
    <div class="address">
      苏州市
    </div>
    <i class="iconfont icon-arrow"></i>
    <div class="search">
      <img src="../../assets/images/search.png"/>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  export default {
    methods: {
      handleCityChange() {
        Toast({
          message: '该功能暂未开发'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  header {
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    width: 100%;
    height: 55px;
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 0.3rem;
    padding-left: 4%;
    z-index: 999;
    box-shadow: 0 0.5px 20px rgba(219, 219, 219, 0.48);
    .icon-arrow {
      padding-left: 7px;
    }
    .search {
      margin-left: 3%;
      cursor: text;
      border-radius: 90px;
      background-color: #eee;
      width: 73%;
      text-align: center;
      height: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 70%;
        width: 50%;
      }
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTYVDwV8AAAY4AAAAHEdERUYAKQAKAAAGGAAAAB5PUy8yPIhIDAAAAVgAAABWY21hcAAP6cUAAAHAAAABQmdhc3D//wADAAAGEAAAAAhnbHlm1dXfigAAAxAAAABIaGVhZBK93lMAAADcAAAANmhoZWEHpgOFAAABFAAAACRobXR4DAAAOAAAAbAAAAAQbG9jYQAkAAAAAAMEAAAACm1heHABDwAdAAABOAAAACBuYW1lKeYRVQAAA1gAAAKIcG9zdHOFdNsAAAXgAAAAMAABAAAAAQAA9vD6pl8PPPUACwQAAAAAANfPzSsAAAAA18/NKwA4AIADyAKAAAAACAACAAAAAAAAAAEAAAOA/4AAXAQAAAAAAAPIAAEAAAAAAAAAAAAAAAAAAAAEAAEAAAAEABEAAQAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5hrmGgOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAAEAAAABAAAOAAAAAMAAAADAAAAHAABAAAAAAA8AAMAAQAAABwABAAgAAAABAAEAAEAAOYa//8AAOYa//8Z6QABAAAAAAAAAQYAAAEAAAAAAAAAAQIAAAACAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAABADgAgAPIAoAAEAAAJQEmNDYyFwkBNjIWFAcBBiIB2P5xESItEgFnAWcSLSIR/nERLpABkBEtIhD+mAFoECItEf5wEAAAAAAAABIA3gABAAAAAAAAABUALAABAAAAAAABAAgAVAABAAAAAAACAAcAbQABAAAAAAADAAgAhwABAAAAAAAEAAgAogABAAAAAAAFAAsAwwABAAAAAAAGAAgA4QABAAAAAAAKACsBQgABAAAAAAALABMBlgADAAEECQAAACoAAAADAAEECQABABAAQgADAAEECQACAA4AXQADAAEECQADABAAdQADAAEECQAEABAAkAADAAEECQAFABYAqwADAAEECQAGABAAzwADAAEECQAKAFYA6gADAAEECQALACYBbgAKAEMAcgBlAGEAdABlAGQAIABiAHkAIABpAGMAbwBuAGYAbwBuAHQACgAACkNyZWF0ZWQgYnkgaWNvbmZvbnQKAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABSAGUAZwB1AGwAYQByAABSZWd1bGFyAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAABHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuAABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAABodHRwOi8vZm9udGVsbG8uY29tAAACAAAAAAAAAAoAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAQAAAABAAIBAgVhcnJvdwAAAAH//wACAAEAAAAMAAAAFgAAAAIAAQADAAMAAQAEAAAAAgAAAAAAAAABAAAAANWkJwgAAAAA18/NKwAAAADXz80r) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-arrow:before {
      content: "\e61a";
    }
  }
</style>
