<template>
  <div class="echart-wrapper">
    <div :id="id" class="myChart" v-if="seriesData&&seriesData.length"></div>
    <div class="no-data" v-show="!seriesData||!seriesData.length">暂无数据</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import echarts from 'echarts';
import { formatPieData, formatData, formatScatterData } from './module/format';
import { OPTIONS, PIE_OPTIONS } from './module/options';

@Component

export default class FeEcharts extends Vue {
  @Prop({default: 'barOrLine'}) id!: string;
  @Prop({default: []}) seriesData!: any[];
  @Prop([Array, Object]) seriesAttrs!: any[] | Record<string, any>;
  @Prop({default: {}}) options!: Record<string, any>;
  @Prop({default: 'barOrLine'}) type!: string;
  @Prop({default: () => {
    return {
      value: 'value',
      name: 'name',
      itemName: 'name',
      data: 'data',
      x: 'x',
      y: 'y'
    };
  }}) params?: Record<string, any>;
  @Watch('seriesData', {deep: true})
  private onDataChanged(val: any[]) {
    if (val && val.length > 0) {
      this.$nextTick(() => {
        this.drawChart();
      });
    }
  }

  private mounted() {
    if (this.seriesData && this.seriesData.length > 0) {
      this.$nextTick(() => {
        this.drawChart();
      });
    }
  }

  private drawChart() {
    if (document.getElementById(this.id)) {
      // 基于准备好的dom，初始化echarts实例
      const FeEchart = echarts.init(document.getElementById(this.id));
      // 处理图表数据
      let options: Record<string, any> = {};
      let echartData: any = [];
      if (this.type === 'pieOrFunnel') {
        echartData = formatPieData(this.seriesData, this.seriesAttrs, this.params);
        // 绘制图表
        PIE_OPTIONS.series = Object.assign({}, echartData);
        options = Object.assign({}, PIE_OPTIONS, this.options);
        FeEchart.setOption(options);
        return;
      } else if (this.type === 'scatter') {
        echartData = formatScatterData(this.seriesData, this.seriesAttrs, this.params);
      } else {
        echartData = formatData(this.seriesData, this.seriesAttrs, this.params);
      }
      OPTIONS.legend.data = echartData.legend;
      OPTIONS.series = echartData.series;
      options = Object.assign({}, OPTIONS, this.options);
      FeEchart.setOption(options);
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./index');
</style>
