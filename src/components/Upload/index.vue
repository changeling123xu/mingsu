<template>
  <div class="hello">
    <div class="block" v-if="urlList.length>0">
      <div v-for="(item,index) of addLink" :key="index" >
        <el-image :src="item" style="width:150px; height:150px" >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </div>
    <el-upload
      class="upload-demo"
      action
      :http-request="handleUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      multiple
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :list-type="listType"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
    <!--

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>-->
  </div>
</template>

<script>
import { put, getFileNameUUID } from "@/utils/ali-oss";

export default {
  name: "Upload",
  props: {
    tip: {
      type: String,
      default: "上传大小不能超过80M"
    },
    limit: {
      type: Number,
      default: 1
    },
    action: {
      type: String,
      default: ""
    },
    headers: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: ""
    },
    listType: {
      type: String,
      default: "text"
    },
    urlList: {
      type: [Array,String],
      default: () => []
    }
  },

  data() {
    return {
      dialogVisible: false,
      fileList: [],
      dialogImageUrl: [],
    };
  },
  computed:{
    addLink(){
      let urlArrary=[]
      let hanveurl=this.urlList.length>0?1:0
      if(hanveurl){
        urlArrary=this.urlList.map(item=>{
          return 'http://xusu.oss-cn-chengdu.aliyuncs.com/'+item
        })
      }
      if(this.urlList.constructor === String){
        this.urlList=this.urlList.split(',')
      }
      return urlArrary
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);

      this.$emit("on-remove", file, fileList);
    },
    handlePreview(file) {
      console.log(file, "123");

      this.$emit("on-preview", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limit} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList) {
      console.log("123", fileList);

      this.fileList = fileList;
      this.$emit("on-success", file, fileList);
    },
    /**
     * 自定义上传方法
     */
    handleUpload(option) {
      // 生成的文件名称
      let objName = getFileNameUUID();

      // 调用 ali-oss 中的方法
      put(`${objName}`, option.file).then(res => {
        let isImage = this.dialogImageUrl.find(item => {
          item == res.name;
        });
        if (!isImage) {
          this.dialogImageUrl.push(res.name);
          this.$emit("on-success", this.dialogImageUrl);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  display: flex;
  flex-direction: row;
}
.block>div{
  margin: 5px;
}
</style>

