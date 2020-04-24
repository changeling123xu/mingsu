<template>
  <el-table :data="orderList" style="width: 100%;padding-top: 15px;" max-height="350">
    <el-table-column label="订单号" min-width="150">
      <template slot-scope="scope">{{ scope.row.order_no }}</template>
    </el-table-column>
    <el-table-column label="支付金额" width="155" align="center">
      <template slot-scope="scope">¥{{ scope.row.price }}</template>
    </el-table-column>
    <el-table-column label="优惠金额" width="95" align="center">
      <template slot-scope="scope">¥{{ scope.row.cuopopPrice }}</template>
    </el-table-column>
    <el-table-column label="支付状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger"
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    }
  },
  data() {
    return {
      list: []
    };
  },
  props:{
    orderList:{
      type:Array,
      default:()=>[],
      required:false,
    }
  },
  // mounted(){
  //     this.fetchData();
  // },
  // methods: {
  //   fetchData() {
  //     let response = getAllHouseOrder();
  //     console.log(response.data);

  //     // .then((response) => {
  //     //   debugger
  //     //   // this.list = data.map(item=>{
  //     //   //   let order={
  //     //   //     order_no:item.rentStar+item.id,
  //     //   //     price:item.price,
  //     //   //     cuopopPrice:item.cuopopPrice,
  //     //   //     status:item.status
  //     //   //   }
  //     //   //   return order
  //     //   // })
  //     //   console.log(response,'123');

  //     // })
  //   }
  // }
};
</script>