<template>
  <section class="login-wrap">
    <el-form ref="form" :rules="rules" :model="registData" label-width="80px" class="login-form">
        <h3>~welcome to regist~</h3>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="registData.userName" @blur="doValidateUserName()"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="registData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="registData.passWord" :type="registData.pwType"></el-input>
          <el-button @click="showPW()">{{registData.pwDes}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doRegist()">注册</el-button>
          <el-button @click="doReset()">重置</el-button>
        </el-form-item>
      </el-form>
    <canvas id="J_Background" class="canvas"></canvas>
  </section>
</template>

<script>
import { render } from '../api/canvas'
import userAPI from '@/api/userAPI'
import { Message } from 'element-ui'
export default {
  name: 'regist',
  data() {
    return {
      registData: {
        userName: '',
        nickName: '',
        passWord: '',
        pwType: 'password',
        pwDes: '显示密码'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1~10个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
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
     * 校验用户名
     */
    doValidateUserName() {
      this.$refs.form.validateField('userName', error => {
        if (error === '') {
          const validateRes = userAPI.validateRegistName(this.registData.userName)
          if (validateRes.IsSuccess || validateRes.ReturnValue) {
            Message({
              message: validateRes.Msg,
              type: 'error',
              duration: 5 * 1000
            })
          }
        }
      })
    },
    /**
     * 注册
     */
    doRegist() {
      this.$refs.form.validate((valide) => {
        if (valide) {
          const registRes = userAPI.regist(this.registData)
          Message({
            message: registRes.Msg,
            type: registRes.IsSuccess ? 'success' : 'error'
          })
          if (registRes.IsSuccess) {
            this.$store.dispatch('Login', this.registData).then(response => {
              Message({
                message: '自动登陆成功',
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
              Message({
                message: '自动登陆失败',
                type: 'error'
              })
              console.log(error)
              this.$router.push({ path: '/login' })
            })
          }
        }
      })
    },
    /**
     * 重置
     */
    doReset() {
      this.registData.userName = ''
      this.registData.nickName = ''
      this.registData.passWord = ''
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
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    padding: 12px 0;
    font-weight: normal;
    font-size: 22px;
    text-align: center;
  }
  .field {
    display: block;
    margin: 0 auto;
    padding: 6px 0;
  }
  .submit {
    padding: 12px 0;
  }
}
</style>


