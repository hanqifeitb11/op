import { getUserinfo } from "../../api/modules/mine";
import { isChild } from "../../api/modules/home";

const state = {
    token: '',// token
    userInfo: {}, // 用户信息
    openYong: false,

}



const mutations = {
    changeData(state, data) {
        console.log(data)
        state[data.key] = data.val;
    }
}

const actions = {
    getUserInfo({ state, commit }, data) {
        getUserinfo({id:data.id}).then(res => {
            commit('changeData', { key: 'userInfo', val: res.data });
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
