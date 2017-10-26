<template>
 <section>
   <div>
     {{msg}}
   </div>
   <br/>
   <div>
     <router-link to="/login">登陆</router-link>
     <br/>
     <router-link to="/regist">注册</router-link>
     <br/>
     <router-link to="/list">列表</router-link>
     <br/>
     <router-link to="/detail">详情</router-link>
     <br/>
     <router-link to="/add">新增</router-link>
     <br/>
   </div>
 </section> 
</template>
<script>
export default {
  name: 'regist',
  data () {
    return {
      msg: 'this is regist page'
    }
  }
}
</script>

