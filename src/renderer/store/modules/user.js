import userAPI from '@/api/userAPI'

const user = {
  state: {
    currentUser: { ID: -1 } // 当前登陆人信息
  },
  mutations: {
    SET_USER: (state, currentUser) => {
      state.currentUser = currentUser
    }
  },
  actions: {
    /**
     * 登陆
     */
    Login: ({ commit }, logInfo) => {
      return new Promise((resolve, reject) => {
        try {
          const loginRes = userAPI.login(logInfo)
          if (loginRes.IsSuccess) {
            resolve(loginRes)
          } else {
            commit('SET_USER', { ID: -1 })
            reject(loginRes)
          }
        } catch (e) {
          const errData = { IsSuccess: false, Msg: '登陆失败:' + e }
          reject(errData)
        }
      })
    },
    /**
     * 登出
     */
    LogOut: ({ commit }) => {
      return new Promise((resolve, reject) => {
        try {
          commit('SET_USER', { ID: -1 })
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },
    /**
     * 获取用户信息
     */
    GetUserInfo: ({ commit }, info) => {
      return new Promise((resolve, reject) => {
        try {
          const userInfoRes = userAPI.getUserInfoByToken(info.token)
          if (userInfoRes.IsSuccess) {
            commit('SET_USER', userInfoRes.ReturnValue)
            resolve()
          } else {
            commit('SET_USER', { ID: -1 })
            reject(userInfoRes)
          }
        } catch (e) {
          commit('SET_USER', { ID: -1 })
          reject(e)
        }
      })
    }
  }
}

export default user
