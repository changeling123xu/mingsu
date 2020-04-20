<template>
  <div>
      <button @click=" sendMessage"></button>
  </div>
</template>
<script>
export default {
  data() {
    return {
       user:{
        username:'客服',
        userId:new Date().getTime(),
        connected:false,
        linked:false,
        isKefu:true,
        type:1 ,//0:访客，1：客服

      }
    };
  },
   sockets: {
    //查看socket是否渲染成功
    connect() {
      this.user.connected=true
      this.$socket.emit('login',this.user)
      console.log("链接成功");
    },
    disconnect() {
      console.log("断开链接");
    }, //检测socket断开链接
    reconnect() {
      console.log("重新链接");
    },
    //客户端接收后台传输的socket事件
    message(data) {
      // this.$notify({
      //   title: "新消息",
      //   message: data,
      //   type: "warning",
      //   duration: 10000
      // });
      console.log("data", data); //接收的消息
    },
    newMessage(data){
      console.log(data);
      
    },
    error(){
      this.user.linked=false
      this.user.connected=false
      console.log('连接已断开...');
      
    }
  },
  mounted(){
     this.$socket.emit("newMessage",values );
  },
  methods: {
    sendMessage() {
       this.$socket.emit("newMessage",values );
      // var ws = new WebSocket("ws://localhost:8089/");
      // ws.onopen = function() {
      //   // console.log(JSON.stringify(this.value));

      //   ws.send('123');
      // };
      // ws.onmessage = function(event) {
      //   var data = JSON.parse(event.data);
      //   console.log(data.da, data.name);
      // };
    }
  }
};
</script>
<style lang="scss" scope>
</style>