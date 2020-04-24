<template>
  <div>
    <echart :option="optionData" :chart-data="chartDatas" />
  </div>
</template>
<script>
import Echart from "@/components/Echart";
export default {
  props:{
    chartDatas:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      chartData: {
        area: [{ name: "海门", value: 9 },
          { name: "成都", value: 120 },
          { name: "大庆", value: 279 }],
        name:["海门","成都","大庆"]
      }
    };
  },
  components: {
    Echart
  },
  mounted:{
    test(){
      console.log(this.chartDatas);
      
    }
  },
  methods: {
    optionData(chartData) {
      console.log(chartData);
      
      let option = {
        title: {
          text: "各省民宿存量图",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: chartData.name
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            center: ["50%", "50%"],
            roseType: "radius",
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: chartData.area
          },
        //   {
        //     name: "面积模式",
        //     type: "pie",
        //     radius: [30, 110],
        //     center: ["75%", "50%"],
        //     roseType: "area",
        //     data: chartData.area
        //   }
        ]
      };
      return option;
    }
  }
};
</script>