<template>
  <div class="availability" v-loading="loading">
    <page-title title="房源信息表">
      <el-button type="text" style="float: right" @click="addHouse">
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
        <el-table-column prop="house_status" label="状态" show-overflow-tooltip></el-table-column>
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
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="tableData.length"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
      />
    </el-card>
  </div>
</template>
<script>
import PageTitle from "@/components/PageTitle";
import { getHouseList, deleteHouse } from "@/api/table";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      creatId: "",
      loading: false,
      currentPage: 1,
      pagesize: 10
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
      if (type === "edite") {
        this.$router.push({
          path: "/availability/availabilitydetile",
          query: {
            id: row.house_id
          }
        });
      } else {
        deleteHouse({ house_id: row.house_id }).then(item => {
          this.$message({
            message: "提交成功！",
            type: "success"
          });
          this.getHouseMessage();
        });
      }
    },
    getHouseMessage() {
      this.loading = true;
      getHouseList().then(result => {
        this.tableData = result.data;
        console.log(this.tableData);

        let id = result.data
          .map(item => {
            return parseInt(item.house_id.match(/\d+/g));
          })
          .sort((a, b) => b - a);
        this.creatId = id[0] + 1;
        this.loading = false;
      });
    },
    addHouse() {
      this.creatId =
        this.creatId > 9 ? "h0" + this.creatId : "h00" + this.creatId;
      this.$router.push({
        path: "/availability/availabilitydetile",
        query: {
          id: this.creatId
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>
<style  scope>
.availability {
  padding: 20px 80px;
}
</style>