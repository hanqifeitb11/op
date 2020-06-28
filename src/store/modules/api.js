


const state ={
    apiList:[],// 同一时间请求的Api列表
}


const mutations = {
    changeApiList(state,apiList){
        state.apiList = apiList;
    }


}

const actions = {

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
}
