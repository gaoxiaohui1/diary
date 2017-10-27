<template>
  <section class="navbar navbar-default navbar-fixed-top">
    <div class="width-limit">
      <span class="nickName">
        hello {{nickName}}
      </span>
      <el-button @click="doLogout()" class="logout">登出</el-button>
    </div>
  </section>
</template>
<script>
import logo from '@/assets/logo.png'
export default {
  name: 'naveBar',
  data() {
    return {
      logoUrl: logo,
      nickName: 'this is not right nickName'
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch('LogOut').then(response => {
        this.$router.push({ path: '/login' })
      }).catch(error => {
        console.log(error)
        this.$router.push({ path: '/login' })
      })
    }
  },
  created() {
    console.log(this.$store.getters.currentUser)
    this.nickName = this.$store.getters.currentUser.nickName
  }
}
</script>
<style scoped>
.navbar {
  /* position: relative; */
  min-height: 50px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.navbar-default {
  background-color:aquamarine;
  border-color:greenyellow;
}
.navbar-fixed-top {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
  top: 0;
  border-width: 0 0 1px;
  border-radius: 0;
}
.width-limit {
  min-width: 768px;
  max-width: 1440px;
  margin: 0 auto;
}
.nickName {
  float: left;
  height: 56px;
  padding: 14px 25px 15px 20px;
}

.logout {
  float: right;
  margin: 11px 6px 0 10px;
  font-size: 15px;
}

.nickName:focus,
.nickName:hover {
  color: #969696;
}
</style>


