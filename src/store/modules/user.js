import { loginApi, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    user: null,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    //把用户提交的数据发送到服务器
    return new Promise((resolve, reject) => {
      loginApi(userInfo)
        .then((res) => {
          const { data } = res;
          if (data) {
            //data 有数据
            commit("SET_USER", data);

            resolve();
          } else {
            //data 没数据
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //恢复登录状态
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        if (typeof res === "string") {
          res = JSON.parse(res);
          if (res.code === 401) {
            reject();
          }
        } else {
          commit("SET_USER", res.data);
          resolve(res);
        }
      });
    });
  },

  //退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout();
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
