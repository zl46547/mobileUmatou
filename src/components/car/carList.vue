<template>
  <div class="carList">
    <el-checkbox-group v-model="checkedcars" @change="checkedCarsChange">
      <el-checkbox v-for="(item,i) in dataList" :label="item" :key="i">
        <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'" alt="购物车图片">
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        checkedcars: [], // 选中的购物车
        'dataList': [
          {
            'Id': 63609304,
            'PriceSmallTotal': 29.9,
            'ProductId': 114277,
            'ProductName': '圣华散养土鸡鲜全翅500g/袋',
            'Unit': '盒',
            'Weight': 500,
            'PvStandard': '500g',
            'PictureId': 500774,
            'DefaultMoney': 29.9
          },
          {
            'Id': 63609121,
            'PriceSmallTotal': 69,
            'ProductId': 10869,
            'ProductVariantId': 11030,
            'ProductName': '伊赛澳洲谷饲牛腱1000g/袋',
            'Unit': '袋',
            'PvStandard': '1kg/袋',
            'PictureId': 145183,
            'DefaultMoney': 85
          },
          {
            'Id': 63609210,
            'PriceSmallTotal': 10.5,
            'ProductId': 5360,
            'ProductVariantId': 5520,
            'ProductName': '卡士发酵乳-原味120g*3',
            'Unit': '组',
            'PvStandard': '120g*3/组',
            'PictureId': 162063,
            'DefaultMoney': 11.8
          }
        ]
      }
    },
    methods: {
      checkedCarsChange(val) {
        this.checkedCities = val ? this.checkedcars = val : []
        this.isIndeterminate = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .carList {
    width: 100vw;
    height: 100vh;
  }

  @media screen and (min-width: 768px) {
  }
</style>
