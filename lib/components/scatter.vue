<template>
  <div class="echart-wrapper">
    <div :id="id" class="myChart" v-if="seriesData&&seriesData.length"></div>
    <div class="no-data" v-show="!seriesData||!seriesData.length">暂无数据</div>
  </div>
</template>
<script>
import { mixins } from './modal/mixins';
import echarts from 'echarts';
import { formatScatterData } from './modal/formatData';
import { OPTIONS } from './modal/options';
export default {
  name: 'e-scatter',
  mixins: [mixins],
  watch: {
    seriesData: {
      handler: function (val) {
        let vm = this;
        if (val && val.length > 0) {
          this.$nextTick(() => {
            vm.drawChart();
          });
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.seriesData && this.seriesData.length > 0) {
      this.$nextTick(() => {
        this.drawChart();
      });
    }
  },
  methods: {
    drawChart() {
      if (document.getElementById(this.id)) {
        // 基于准备好的dom，初始化echarts实例
        let barEchart = echarts.init(document.getElementById(this.id));
        // 处理图表数据
        const echartData= formatScatterData(this.seriesData, this.seriesAttrs, this.params);
        // 绘制图表
        OPTIONS.legend.data = echartData.legend
        OPTIONS.series = echartData.series;
        let options = Object.assign({}, OPTIONS, this.options);
        barEchart.setOption(options);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.echart-wrapper {
  .myChart {
    width: 100%;
    height: 100%;
  }
  .no-data {
    text-align: center;
    position: relative;
    top: 50%;
  }
}
</style>
