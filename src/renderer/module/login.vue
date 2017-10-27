<template>
  <section class="login-wrap">
    <el-form ref="form" :rules="rules" :model="loginData" label-width="80px" class="login-form">
      <h3>~welcome to login~</h3>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginData.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="loginData.passWord" :type="loginData.pwType"></el-input>
        <el-button @click="showPW()">{{loginData.pwDes}}</el-button>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" @click="doLogin()">登陆</el-button>
        <el-button @click="doReset()">重置</el-button>
      </el-form-item>
    </el-form>
    <canvas id="J_Background" class="canvas"></canvas>
  </section>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { render } from '../api/canvas'
export default {
  name: 'login',
  data() {
    return {
      loginData: {
        userName: '',
        passWord: '',
        pwType: 'password',
        pwDes: '显示密码'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1~10个字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1~10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    render: render,
    /**
     * 密码显示隐藏
     */
    showPW() {
      if (this.loginData.pwType === 'password') {
        this.loginData.pwType = ''
        this.loginData.pwDes = '隐藏密码'
      } else {
        this.loginData.pwType = 'password'
        this.loginData.pwDes = '显示密码'
      }
    },
    /**
     * 登陆
     */
    doLogin() {
      this.$refs.form.validate((valide) => {
        if (valide) {
          this.$store.dispatch('Login', this.loginData).then(response => {
            Message({
              message: '登陆成功',
              type: 'success'
            })
            this.$store.dispatch('GetUserInfo', { token: response.ReturnValue }).then(response1 => {
              this.$router.push({ path: '/list' })
            }).catch(err => {
              console.log(err)
              Message({
                message: '获取用户信息失败,请重新登陆',
                type: 'error'
              })
              this.$router.push({ path: '/login' })
            })
          }).catch(error => {
            console.log(error)
            MessageBox.confirm(error.Msg + '，登陆失败了。。。', '提示', {
              type: 'error',
              confirmButtonText: '注册新账号',
              cancelButtonText: '重新登陆'
            }).then(() => {
              this.$router.push({ path: '/regist' })
            }).catch(() => {
              this.$router.push({ path: '/login' })
            })
          })
        }
      })
    },
    /**
     * 重置
     */
    doReset() {
      this.loginData.userName = ''
      this.loginData.passWord = ''
    }
  },
  mounted() {
    this.render()
  }
}
</script>
<style scoped>
.login-wrap {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #111;
}
.canvas {
  width: 100%;
  height: 100%;
  position: absolute;
}
.login-form {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 16px 20px 0;
  width: 360px;
  height: 252px;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 2px 2px 32px 1px rgba(0, 0, 0, 0.45);
  opacity: 0.75;
}
.login-form h3 {
  margin-top: 0;
  margin-bottom: 0;
  padding: 12px 0;
  font-weight: normal;
  font-size: 22px;
  text-align: center;
}
.login-form .field {
  display: block;
  margin: 0 auto;
  padding: 6px 0;
}
.login-form.submit {
  padding: 12px 0;
}
</style>


