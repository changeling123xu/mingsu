<template>
  <div class="hello">
    <div class="block" v-if="urlList.length>0">
      <div v-for="(item,index) of urlList" :key="index">
        <div class="blockIcon">
          <div class="blockIconimage" @click="deleteImgae(item)">
            <i class="el-icon-circle-close"></i>
          </div>
          <el-image :src="item.url" style="width:150px; height:150px">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </div>
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
      type: [Array, String],
      default: () => []
    }
  },

  data() {
    return {
      dialogVisible: false,
      fileList: [],
      dialogImageUrl: []
    };
  },
  computed: {
    // addLink() {
    //   let urlArrary = [];
    //   let hanveurl = this.urlList.length > 0 ? 1 : 0;
    //   if (hanveurl) {
    //     urlArrary = this.urlList.map(item => {
    //       return "http://xusu.oss-cn-chengdu.aliyuncs.com/" + item;
    //     });
    //   }
    //   if (this.urlList.constructor === String) {
    //     this.urlList = this.urlList.split(",");
    //   }
    //   // this.fileList=urlArrary
    //   return urlArrary;
    // }
  },
  methods: {
    deleteImgae(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("on-remove", data);
          let list=this.urlList.filter(item=>{
           let flag= item.id!=data.id
            if(flag){
              return item
            }
          })
          debugger

          this.urlList=list
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
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
      put(`shoutRent/${objName}`, option.file).then(res => {
        let isImage = this.dialogImageUrl.find(item => {
          item == res.name;
        });
        if (!isImage) {
          this.dialogImageUrl.push(objName);
          this.$emit("on-success", this.dialogImageUrl);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .blockIcon {
    position: relative;
    .blockIconimage {
      height: 20px;
      width: 20px;
      position: absolute;
      right: 0;
      z-index: 10;
    }
  }
}
.block > div {
  margin: 5px;
}
</style>

