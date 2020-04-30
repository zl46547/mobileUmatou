<template>
  <div class="common-picker_wrap">
    <ActionSheet
      v-model="visible"
      v-if="visible"
      :close-on-click-overlay="false">
      <Picker
        ref="picker"
        :columns="columns"
        show-toolbar
        :title="title"
        v-if="type === 'picker'"
        :visible-item-count="4"
        :item-height="40"
        value-key="text"
        @confirm="onConfirm"
        @cancel="onCancel">
      </Picker>
      <DatetimePicker
        v-else
        @cancel="onCancel"
        @confirm="onConfirm"
        :visible-item-count="4"
        :item-height="40"
        :title="title"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        v-model="date"
        :type="type"></DatetimePicker>
    </ActionSheet>
  </div>
</template>

<script>
  import {DatetimePicker, ActionSheet, Picker} from 'vant'
  export default {
    name: 'MyPicker',
    components: {
      DatetimePicker,
      ActionSheet,
      Picker
    },
    props: {
      title: {
        default: ''
      },
      type: {
        default: 'date'
      },
      visible: {
        default: false,
        required: true
      },
      columns: {
        default() {
          return []
        }
      },
      minDate: {
        default: undefined
      },
      maxDate: {
        default: undefined
      },
      defaultDate: {
        default() {
          return new Date()
        }
      },
      value: {
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        date: this.defaultDate
      }
    },
    methods: {
      onCancel() {
        this.$emit('cancel')
      },
      onConfirm(val) {
        this.$emit('confirm', val)
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        }
        return value
      }
    },
    watch: {
      defaultDate() {
        this.date = this.defaultDate
      },
      visible(val) {
        if (val && this.type === 'picker' && this.value.text) {
          const index = this.columns.findIndex(val => val.value === this.value.value)
          index >= 0 && this.$nextTick(() => {
            this.$refs.picker.setColumnIndex(0, index)
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .van-picker-column__item--selected {
    font-size: 120% !important;
  }

  .van-picker {
    .van-picker__cancel {
      color: #999;
    }

    .van-picker__confirm {
      color: #FF550F;
    }
  }
</style>
