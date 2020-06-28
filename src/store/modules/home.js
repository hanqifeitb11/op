


const state = {
    isreportItem:{},//是否举报
    isinit:'',
    routerName:'',
    NextTIme:{},
    tiem_next: null,
    tabIndex: 1,
    UploadUrl: '/yxh/photo/push',
    currentSubject: {},// 当前选择的Ya组对象
    subject_id: '',//选择Ya组时传递的参数,
    title: '',//选择Ya组时传递的Ya组,
    is_update_height: '',
    videoURL: '',
    total: 10,
    isProps: 0,//这边默认是关闭
    isSelectItem: {},
    videoItem: {},//视频资源
    Item: {},

}


const mutations = {
    changeData(state, data) {
        console.log(data)
        state[data.key] = data.val;
    },

}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
