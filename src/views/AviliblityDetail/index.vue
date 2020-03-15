<template>
  <div class="app-container">
    <el-form ref="form" :model="houseMessage" label-width="120px">
      <el-form-item label="小区名称">
        <el-col :span="12">
          <el-input v-model="houseMessage.house_name" />
        </el-col>
      </el-form-item>
      <el-form-item label="户型">
        <el-select v-model="houseMessage.house_type" placeholder="请输入户型">
          <el-option
            v-for="item in houseType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="租赁日期" v-if="value">
        <el-col :span="5">
          <el-date-picker
            v-model="houseMessage.house_rentTime"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">到</el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="houseMessage.house_rentDay"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="面积">
        <el-input-number v-model="houseMessage.house_area" :step="2"></el-input-number>
      </el-form-item>
      <el-form-item label="租金">
        <el-input-number v-model="houseMessage.house_price" :step="2"></el-input-number>
      </el-form-item>
      <el-form-item label="提供的服务">
        <el-transfer v-model="houseMessage.house_servers" :data="houseServer" :titles="['所有服务', '可提供的服务']"></el-transfer>
      </el-form-item>
      <el-form-item label="房源描述">
        <el-input v-model="houseMessage.house_descrip" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"></el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getHouseAllServer,getHouseList,setUpdateHouse} from '@/api/table'
export default {
  name:'AviliblityDetail',
  data() {
    return {
      houseServer: [],
      values: [],
      value: true,
      num: "10",
      houseMessage:{},
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      houseType: [
        {
          label: "一居",
          value: "一居"
        },
        {
          label: "二居",
          value: "二居"
        },
        {
          label: "三居",
          value: "三居"
        },
        {
          label: "四居+",
          value: "四居+"
        }
      ]
    };
  },
  mounted(){
    this.getHouseServer()
  },
  methods: {
    getHouseServer(){
      let userId = this.$route.query.id
      getHouseAllServer().then(item=>{
        this.houseServer=item.data.map(item1=>{
          return {
            key:item1.F_id,
            label:item1.F_name
          }
        })
      })
      getHouseList({house_id:userId}).then(item=>{
        this.houseMessage=item.data[0]
        this.houseMessage.house_servers=item.data[0].house_servers.split(',')
        console.log(this.houseMessage);

      })

    },
    onSubmit() {
      // console.log(this.$route.query.id);
      setUpdateHouse(this.houseData).then(data=>{
        console.log(data);

      })
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  },
  computed:{
  houseData(){
    let data = this.houseMessage
    data.house_servers=data.house_servers.toString()
    return data
  }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

