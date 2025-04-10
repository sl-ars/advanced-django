import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    SET_USER(state, user) { state.user = user; },
    SET_TOKEN(state, token) { state.token = token; localStorage.setItem('token', token); },
    LOGOUT(state) { state.user = null; state.token = ''; localStorage.removeItem('token'); },
  },
  actions: {
    async login({ commit }, credentials) {
      const { data } = await axios.post(`${API_URL}login/`, credentials);
      commit('SET_TOKEN', data.access);
    },
    async fetchUser({ commit, state }) {
      const { data } = await axios.get(`${API_URL}user/`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      commit('SET_USER', data);
    },
    logout({ commit }) { commit('LOGOUT'); },
  },
});
