import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    // token初始化
    token: '',
    name:'',
    userId:'',
    regSys: '',
    groupData: [],
  },
  mutations:{
    // 存储token
    set_token(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    set_name(state, name) {
      state.name = name;
      sessionStorage.setItem('name', name);
    },
    set_userId(state, userId) {
      state.userId = userId;
      sessionStorage.setItem('userId', userId);
    },
    set_regSys(state, regSys) {
      state.regSys = regSys;
      sessionStorage.setItem('regSys', regSys);
    },
    // 删除token
    del_token(state) {
      state.token = '';
      sessionStorage.removeItem('token');
    },
    del_name(state) {
      state.name = '';
      sessionStorage.removeItem('name');
    },
    del_userId(state) {
      state.userId = '';
      sessionStorage.removeItem('userId');
    },
    del_regSys(state) {
      state.regSys = '';
      sessionStorage.removeItem('regSys');
    },
    // 设置分组数据
    set_group_data(state, data) {
      state.groupData = data;
    },
  }
})

export default store
