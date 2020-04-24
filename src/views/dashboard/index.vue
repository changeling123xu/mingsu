<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!-- <line-chart :chart-data="lineChartData" /> -->
      <line-charts :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <order-table :orderList="orderList" />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;"
      >
        <pipe-chart :chartDatas="houseMap" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import LineCharts from "./LinChart";
import PipeChart from "./PipeChart";
import OrderTable from "./components/OrderTable";
import { getAllHouseOrder ,getHouseCount} from "@/api/table";

// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    val:'访客（人）'
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
    val:'消息（条）'
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
    val:'金额（千）'
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
    val:'金额（千）'

  }
};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    LineCharts,
    PipeChart,
    OrderTable
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      orderList: [],
      houseMap:{},
    };
  },
  mounted() {
    this.pipeChart();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
   async pipeChart() {
      getAllHouseOrder().then(({ data }) => {
        this.orderList = data.map(item => {
          return {
            order_no: item.rentStar + item.id,
            price: item.totalValue,
            cuopopPrice: item.couponValue,
            status: item.status
          };
        });
      });
      await this.houseCount()
    },
    async houseCount(){
      let {data}=await getHouseCount()
      let houseData=data.map(item=>{
        return {
          value:item.count,
          name:item.cityname
        }
      })
      
      let name=data.map(item=>item.cityname)
      this.houseMap={area:houseData,name:name}
      console.log(this.houseMap);
      
      
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
