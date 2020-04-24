<template>
  <div>
    <echart :option="optionData" :chart-data="chartData" />
  </div>
</template>
<script>
import Echart from "@/components/Echart";
export default {
  data() {
    return {
      option: {
      },
      mouth:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  methods: {
    optionData(dataChart) {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["期望", "实际"]
        },
        xAxis: [
          {
            type: "category",
            data: this.mouth,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name:dataChart.val,
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          }
        //   {
        //     type: "value",
        //     name: "温度",
        //     min: 0,
        //     max: 25,
        //     interval: 5,
        //     axisLabel: {
        //       formatter: "{value} °C"
        //     }
        //   }
        ],
        series: [
          {
            name: "期望",
            type: "bar",
            data: dataChart.expectedData
          },
          {
            name: "实际",
            type: "bar",
            data: dataChart.actualData
          }
        ]
      };

      return option;
    }
  },
  components: {
    Echart
  }
};
</script>