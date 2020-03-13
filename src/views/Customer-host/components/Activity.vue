<template>
  <div class="user-activity">
    <div class="post" v-for="item in renterMessage" :key="item.id">
      <div class="user-block">
        <img
          class="img-circle"
          :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix"
        />
        <span class="username text-muted">{{item.renterName}}</span>
        <span class="description">{{item.renterTime}}</span>
      </div>
      <p>{{item.renterMessage}}
      </p>
      <div class="user-images" v-if="item.renterImage.length>0">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="img in item.renterImage" :key="img">
            <img :src="img.ms_url" class="image" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            处理
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />忽略
          </span>
        </li>
      </ul>
    </div>
    <!-- <div class="post">
      <div class="user-block">
        <img
          class="img-circle"
          :src="'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg'+avatarPrefix"
        />
        <span class="username text-muted">Captain American</span>
        <span class="description">Sent you a message - yesterday</span>
      </div>
      <p>
        Lorem ipsum represents a long-held tradition for designers,
        typographers and the like. Some people hate it and argue for
        its demise, but others ignore the hate as they create awesome
        tools to help create filler text for everyone from bacon lovers
        to Charlie Sheen fans.
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            Share
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />Like
          </span>
        </li>
      </ul>
    </div>
      renterId:item.renter_id,
          renterTime:item.renter_time,
          renterMessage:item.renter_message,
          renterName:item.rent_name,
          renterEmail:item.rent_email,
          renterPhone:item.rnet_phone,
          renterImage:mesg
     -->
    <!-- <div class="post">
      <div class="user-block">
        <img
          class="img-circle"
          :src="'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg'+avatarPrefix"
        />
        <span class="username">Spider Man</span>
        <span class="description">Posted 4 photos - 2 days ago</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item" class="image" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" /> Share
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />Like
          </span>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { getRenterMessage } from "@/api/customer";
const avatarPrefix = "?imageView2/1/w/80/h/80";
const carouselPrefix = "?imageView2/2/h/440";

export default {
  data() {
    return {
      renterMessage:[],
      carouselImages: [
        "http://image01.iyoujia.com/m0/1912/MPP7o6uXygEm1CSCPJuhGRkgDkYrcjR8.jpg?x-oss-process=image/resize,m_fill,w_1125,h_1260,limit_0/auto-orient,0/quality,q_70/",
        "http://image01.iyoujia.com/m0/1912/MPP7o6uXygEm1CSCPJuhGRkgDkYrcjR8.jpg?x-oss-process=image/resize,m_fill,w_1125,h_1260,limit_0/auto-orient,0/quality,q_70/",
        "http://image01.iyoujia.com/m0/1912/MPP7o6uXygEm1CSCPJuhGRkgDkYrcjR8.jpg?x-oss-process=image/resize,m_fill,w_1125,h_1260,limit_0/auto-orient,0/quality,q_70/",
        "http://image01.iyoujia.com/m0/1912/MPP7o6uXygEm1CSCPJuhGRkgDkYrcjR8.jpg?x-oss-process=image/resize,m_fill,w_1125,h_1260,limit_0/auto-orient,0/quality,q_70/"
      ],
      avatarPrefix,
      carouselPrefix
    };
  },
  mounted(){
   this.getRenter();
  },
  methods:{
     getRenter(){
      getRenterMessage().then(({data})=>{
      this.renterMessage=data.data

      });

    }
  }
};
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {
    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;
    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {
      &:hover,
      &:focus {
        color: #999;
      }
    }
  }
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
