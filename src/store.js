import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    // token初始化
    token: '',
    name:'',
    userId:'',
    currentRegSys: '',
    groupData: [],
    tokens: {
      ossAccessKeyId: null,
      ossAccessKeySecret: null,
      ossToken: null
    },
  },
  mutations:{
    // 存储token
    set_token(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    set_tokens(state, tokens) {
      Object.assign(state.tokens, tokens);
    },
    set_name(state, name) {
      state.name = name;
      sessionStorage.setItem('name', name);
    },
    set_userId(state, userId) {
      state.userId = userId;
      sessionStorage.setItem('userId', userId);
    },
    set_currentRegSys(state, currentRegSys) {
      state.currentRegSys = currentRegSys;
      sessionStorage.setItem('currentRegSys', currentRegSys);
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
    del_currentRegSys(state) {
      state.currentRegSys = '';
      sessionStorage.removeItem('currentRegSys');
    },
    // 设置分组数据
    set_group_data(state, data) {
      state.groupData = data;
    },
  }
})

export default store;
