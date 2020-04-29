<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="房源详情" title="返回" class="minsu-back"></el-page-header>
    <el-form ref="form" :model="houseMessage" label-width="120px" v-loading="loading">
      <el-form-item label="小区名称">
        <el-col :span="12">
          <el-input v-model="houseMessage.house_name" />
        </el-col>
      </el-form-item>
      <el-form-item label="特色标签">
        <el-select
          v-model="houseMessage.house_Tag"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择"
        >
          <el-option
            v-for="item in houseType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房屋评分">
        <div class="container-rate">
          <el-rate v-model="houseMessage.score" show-text></el-rate>
        </div>
      </el-form-item>
      <el-form-item label="户型">
        <el-select v-model="houseOther.house_type" style="margin-left: 20px;" placeholder="请选择">
          <el-option
            v-for="item in houseTypeTag"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="特色标签">
        <el-select
          v-model="houseMessage.introduce"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择"
        >
          <el-option
            v-for="item in houseMessage.introduce"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租赁日期">
        <el-col :span="5">
          <el-date-picker
            v-model="houseMessage.house_rentTime"
            type="date"
            placeholder="Pick a date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">到</el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="houseMessage.house_rentDay"
            type="date"
            placeholder="Pick a date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="面积">
        <el-input-number v-model="houseMessage.house_area" :step="2"></el-input-number>
      </el-form-item>-->
      <el-form-item label="租金">
        <el-input-number v-model="houseMessage.house_price" :step="2"></el-input-number>
      </el-form-item>
      <el-form-item label="提供的服务">
        <el-transfer
          v-model="houseOther.house_servers"
          :data="houseServer"
          :titles="['所有服务', '可提供的服务']"
        ></el-transfer>
      </el-form-item>
      <el-form-item label="房源描述">
        <el-input v-model="houseOther.house_descrip" type="textarea" />
      </el-form-item>
      <el-form-item label="房源图片">
        <upload
          :limit="5"
          :listType="'picture-card'"
          :urlList="houseMessage.house_image"
          @on-success="onSuccess"
          @on-remove="onRemove"
        ></upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getHouseAllServer, getHouseList, setUpdateHouse ,deleteHouseImage} from "@/api/table";
import Upload from "@/components/Upload";
export default {
  name: "AviliblityDetail",
  data() {
    return {
      houseServer: [],
      values: [],
      loading: false,
      // url: "http://xusu.oss-cn-chengdu.aliyuncs.com/",
      houseMessage: {
        id: null,
        house_id: "",
        house_name: "",
        introduce:[],
        house_area: "",
        scroe: null,
        house_price: "",
        house_image: []
      },
      houseOther: {
        house_status: "",
        house_servers: [],
        house_descrip: "",
        house_rentTime: "",
        house_rentDay: "",
        house_type: ""
      },
      houseType: [
        {
          label: "优选",
          value: "优选"
        },
        {
          label: "自营",
          value: "自营"
        },
        {
          label: "品牌民宿",
          value: "品牌民宿"
        },
        {
          label: "新房",
          value: "新房"
        }
      ],
      houseTypeTag: [
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
          label: "四局",
          value: "四局"
        }
      ],
      house_image: []
    };
  },
  mounted() {
    this.getHouseServer();
  },
  methods: {
    getHouseServer() {
      let userId = this.$route.query.id;
      this.houseMessage.house_id=userId
      getHouseAllServer().then(item => {
        this.houseServer = item.data.map(item1 => {
          return {
            key: item1.F_id,
            label: item1.F_name
          };
        });
      });
      getHouseList({ house_id: userId }).then(({ data }) => {
        if (data.houseData.length > 0) {
          let houseData = data.houseData.map(item => {
            let titleTag =
              item && item.titleTagList ? item.titleTagList.split(",") : [];
            console.log(item);

            let image = item.houseUrl.map(item => {
              let url= "http://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/" + item.houser_image + ".jpg";
              return {url:url,id:item.id}
            });
            return {
              id: item.id,
              house_id: item.houseId,
              house_name: item.title,
              introduce:item.introduce.split('·'),
              house_Tag: titleTag,
              score: item.score - 0,
              house_price: item.price,
              house_image: image
            };
          });
          this.houseMessage = houseData[0];
        }
        if (data.houseOther.length > 0) {
          let item = data.houseOther[0];
          this.houseOther = item;
        }
        console.log(this.houseOther);
      });
    },
    onSubmit() {
      let sendData = {
        houseMessage: this.houseMessage,
        houseOther: this.houseOther,
        houseImage:this.house_image
      };
      this.loading = true;
      // if (
      //   this.houseMessage.house_image.length == 0 ||
      //   this.house_image.length == 0
      // ) {
      //   this.houseMessage.house_image += this.house_image;
      // } else {
      //   this.houseMessage.house_image += "," + this.house_image;
      // }
      setUpdateHouse(sendData).then(data => {
        this.loading = false;
      });
      this.$router.push("/availability/availability");
      this.$message({
        message: "提交成功！",
        type: "success"
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    goBack() {
      this.$router.push("/availability/availability");
    },
    onSuccess(data) {
      this.house_image = data;
    },
    onRemove(data){
      let config={id:data.id}
      deleteHouseImage(config)
      
    }
  },
  computed: {
    houseData() {
      let data = this.houseOther;
      data.house_servers = data.house_servers.toString();
      data.house_image = data.house_image.toString();
      return data;
    }
    // compareImage() {
    //   let src = this.houseMessage.house_image;
    //   let _this = this;
    //   let data=[]
    //   if (src.constructor === String) {
    //     data=src.split(',').forEach(item => {
    //       return this.url + item;
    //     });
    //     return data
    //   }

    //   // if(src.length>0){
    //   //   src=src.map(item=>{this.url+item})
    //   // }
    //   return src;
    // }
  },
  components: {
    Upload
  }
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
.minsu-back {
  margin-top: 10px;
  margin-bottom: 25px;
}
.app-container {
  .container-rate {
    margin-top: 10px;
  }
}
</style>

