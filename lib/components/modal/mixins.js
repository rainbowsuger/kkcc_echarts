export const mixins = {
  props: {
    id: {
      type: String,
      default: 'barOrLine' // 针对一个页面出现多个组件
    },
    seriesData: {
      type: Array // series数据
    },
    seriesAttrs: {
      type: [Array, Object] // series属性
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    params: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          name: 'name',
          itemName: 'name',
          data: 'data',
          x: 'x',
          y: 'y'
        }
      }
    }
  }
};
