<template>
  <div class="customer">
    <page-title title="租客信息表">
      <el-button type="text" style="float: right">
        <span>新增</span>
        <i class="el-icon-circle-plus-outline el-icon--right" />
      </el-button>
    </page-title>
    <el-card shadow="hover">
      <el-table :data="renterData.data" style="width: 100%" fit highlight-current-row>
        <el-table-column prop="date" label="入住时间" width="180" align="center" />
        <el-table-column prop="name" label="姓名" width="180" align="center" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="phone" label="联系方式" width="180" align="center" />
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
                    type: 'details',
                    row: scope.row
                  }"
                >详情</el-dropdown-item>
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
      <el-dialog title="租客信息" :visible.sync="flag">
        <el-form :model="tenantInformation">
          <el-form-item label="租客名称" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
            <el-input placeholder="请输入内容" v-model="tenantInformation.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="租客电话" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
            <el-input placeholder="请输入内容" v-model="tenantInformation.telephone" clearable></el-input>
          </el-form-item>
          <el-form-item label="入住时间" :label-width="formLabelWidth">
            <!-- <div class="block"> -->
            <!-- <span class="demonstration">默认</span> -->
            <el-date-picker
              v-model="tenantInformation.date"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <!-- </div> -->
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="tenantInformation.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="租住地址" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
            <el-input placeholder="请输入内容" v-model="tenantInformation.address" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="flag = false">取 消</el-button>
          <el-button type="primary" @click="flag = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-pagination background layout="prev, pager, next" :total="10" />
    </el-card>
  </div>
</template>
<script>
import PageTitle from "@/components/PageTitle";
import { getRenterList } from "@/api/table";
export default {
  components: {
    PageTitle
  },
  data() {
    return {
      renterData:{
        total:1,
        data:[]
      },
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      flag: false,
      tenantInformation: {
        name: "1",
        telephone: "1",
        date: "",
        region: "",
        address: ""
      },
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.renterList();
  },
  methods: {
    // handleEdit(index, row) {
    //   console.log(index, row)
    // },
    // handleDelete(index, row) {
    //   console.log(index, row)
    // }
    renterList() {
      getRenterList({}).then(({ data }) => {

        let dataList=data.map(item => {
          // let time=itme.rent_time.
          return {
            userId:item.user_id,
            date: item.rent_time,
            name: item.rent_name,
            phone: item.rent_phone,
            address: item.rent_address
          };
        });
        this.renterData={
          total:data.length,
          data:dataList
        }
        // user_id: "a001"
        // rent_name: "张三"
        // rent_email: "2431729@qq.com"
        // rent_phone: "12700487466"
        // house_id: "h001"
        // rent_image: null
        // rent_time: "2020-02-02T16:00:00.000Z"
        // rent_address: null
      });
    },
    handleCommand({ type, row }) {
      // if (type === 'edite') {
      // }
      this.flag = type == "details" ? true : false;
      console.log(type, row);
    }
  }
};
</script>
<style scope>
.customer {
  padding: 20px 80px;
}
</style>
