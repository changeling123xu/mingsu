<template>
  <div class="availability">
    <page-title title="房源信息表">
      <el-button type="text" style="float: right">
        <span>新增</span>
        <i class="el-icon-circle-plus-outline el-icon--right" />
      </el-button>
    </page-title>
    <el-card shadow="hover">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <!-- @selection-change="handleSelectionChange" -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="house_id" label="ID" show-overflow-tooltip></el-table-column>

        <el-table-column prop="house_name" label="小区名称" width="120"></el-table-column>
        <el-table-column prop="house_status" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="house_type" label="户型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="house_area" label="面积" show-overflow-tooltip></el-table-column>
        <el-table-column prop="house_price" label="价格" show-overflow-tooltip></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.house_rentTime }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand">
              <el-button plain size="small" icon="el-icon-menu">
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="{
                    type: 'edite',
                    row: scope.row
                  }"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  :command="{
                    type: 'delete',
                    row: scope.row
                  }"
                >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import PageTitle from "@/components/PageTitle";
import { getHouseList } from "@/api/table";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  components: {
    PageTitle
  },
  mounted() {
    this.getHouseMessage();
  },
  methods: {
    handleCommand({ type, row }) {
      let userId='a001'
      this.$router.push({
        path: '/availability/availabilitydetile',
        query: {
            id: userId
          }
      })
      // this.$router.push({path: `/availability/availabilitydetile/${userId}`})
      console.log(type, row);
    },
    getHouseMessage() {
      getHouseList().then(result => {
        // hose_id: "h001"
        // house_name: "李家沟"
        // house_area: "20"
        // house_price: "200"
        // house_image: null
        // house_status: "f"
        // house_servers: "f001f002f003"
        // house_descrip: "不得了啊"
        // house_rentTime: "2019-02-03"
        // house_rentDay: "2019-02-20"
        // house_type: "一套三"
        // let data = result.data.map(item => {
        //   return {
        //     house_rentTime: item.house_rentTime,
        //     house_name: item.house_name,
        //     house_id: item.house_id,
        //     house_status: item.house_status,
        //     house_type: item.house_type,
        //     house_area: item.house_area,
        //     house_price: item.house_price
        //   };
        // });
        this.tableData=result.data
      });
    }
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // }
  }
};
</script>
<style  scope>
.availability {
  padding: 20px 80px;
}
</style>
