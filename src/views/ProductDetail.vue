<template>
  <div>商品详情
    {{pictureID}}
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        pictureID: ''
      }
    },
    mounted () {
      var pictureID = this.$route.params.id
      this.pictureID = pictureID
    },
    methods: {}
  }
</script>

<style scoped>

</style>
