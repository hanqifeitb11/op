import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Navigation from 'vue-navigation'

/**
 * Home
 */
import Home from '@/views/Home/home.vue'


/**
 * Mine
 */

import Login from '@/views/Mine/Login/login.vue'
import UseraGreement from '@/views/Mine/Login/useragreement.vue'
import PrivacyPolicy from '@/views/Mine/Login/privacypolicy.vue'
import Systemsettings from '@/views/Mine/Systemsettings/systemsettings.vue'
import Personaldetail from '@/views/Mine/Personaldetail/personaldetail.vue'
import Feedback from '@/views/Mine/Systemsettings/feedback.vue'
import Feedback_edit from '@/views/Mine/Systemsettings/feedback_edit.vue'
import Username from '@/views/Mine/UserDetail/username.vue'
import Tb_Video_detail from '@/views/Home/components/tb_video_details.vue'
import Tbdetails from '@/views/Home/components/tb_detail.vue'
import talkChat from '@/views/Mine/talkChat.vue'
import Account_security from '@/views/Mine/Systemsettings/account_security.vue'
import shield from '@/views/Mine/Systemsettings/shield.vue'
import unboundPhone from '@/views/Mine/Systemsettings/unboundPhone.vue'
import Upload from '@/views/Home/upload/upload.vue'
import cancel_account from '@/views/Mine/Systemsettings/cancel_account.vue'
import mine from '@/views/Mine/mine.vue'
import search from '@/views/Mine/search/search.vue'
import searchResult from '@/views/Mine/search/searchResult.vue'
import Amusing from '@/views/Mine/Systemsettings/Amusing.vue'
import chooseTopic from '@/views/Topic/chooseTopic/chooseTopic.vue'
import report from '@/views/Mine/Systemsettings/report.vue'
import block_topics from '@/views/Mine/Systemsettings/block_topics.vue'
// 这是投屏
import castScreen from "../views/Home/castScreen/castScreen";

/**
 * Topic
 */
import createTopic from '@/views/Topic/createTopic/createTopic.vue'
import topicSuccess from "../views/Topic/topicSuccess/topicSuccess";
import topicDetail from "../views/Topic/topicDetail/topicDetail";
import contact from '@/views/Mine/Systemsettings/contact.vue'


// 
import video_plug from '../components/video/videoplayer.vue'

import myFans from '@/views/Mine/myFans.vue'
import myCare from '@/views/Mine/myCare.vue'
import myMessageList from '@/views/Mine/myMessageList.vue'
import myNoticeList from '@/views/Mine/myNoticeList.vue'

import Video from '../../src/components/video/video.vue'


import others from '@/views/Mine/OtherUserInfo.vue'
import pushedSuccess from '@/views/Home/upload/success.vue'
import firstDialog from '@/views/firstDialog.vue'


// import mine from "../views/Mine/mine.vue";
import mypost from "../views/Home/mypost/mypost";
import mylikes from "../views/Home/mylikes/mylikes";

import videoCache from "../views/Mine/videoCache";

/**
 * end
 * @type {{redirect: string, path: string, component, children: [{path: string, component: *, name: string}, {path: string, component: *, name: string}, {path: string, component: *, name: string}, {path: string, component: *, name: string}], name: string}[]}
 */
const routes = [

    {
        path: '/',
        name: 'firstDialog',
        component: firstDialog,
        meta: {
            isShow: 0,
        }
    },

    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            isShow: 1,
        }
    },
    {
        path: '/Video',
        name: 'Video',
        component: Video
    },
    {
        path:'/video_plug',
        name:'video_plug',
        component:video_plug
    },
    {
        path: '/castScreen',
        name: 'castScreen',
        component: castScreen
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }, {
        path: '/UseraGreement',
        name: "UseraGreement",
        component: UseraGreement
    },
    {
        path: '/PrivacyPolicy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy
    }, {
        path: "/Systemsettings",
        name: 'Systemsettings',
        component: Systemsettings
    }, {
        path: '/Personaldetail',
        name: 'Personaldetail',
        component: Personaldetail
    }, {
        path: '/Username',
        name: 'Username',
        component: Username
    }, {
        path: '/Feedback',
        name: 'Feedback',
        component: Feedback
    },
    {
        path: '/mylikes',
        name: 'mylikes',
        component: mylikes
    },
    {
        path: '/pushedSuccess',
        name: 'pushedSuccess',
        component: pushedSuccess
    }
    , {
        path: '/Feedback_edit',
        name: 'Feedback_edit',
        component: Feedback_edit
        // feedback_edit
    }, {
        path: "/Tbdetails",
        name: 'Tbdetails',
        component: Tbdetails
    }, {
        path: '/Tb_Video_detail',
        name: 'Tb_Video_detail',
        component: Tb_Video_detail
    },

    {
        path: '/createTopic',
        name: 'createTopic',
        component: createTopic
    },
    {
        path: '/talkChat',
        name: 'talkChat',
        component: talkChat
    },
    {
        path: "/Upload",
        name: 'Upload',
        component: Upload
    },
    {
        path: '/topicSuccess',
        name: 'topicSuccess',
        component: topicSuccess
    },
    {
        path: '/topicDetail',
        name: 'topicDetail',
        component: topicDetail
    },
    {
        path: '/chooseTopic',
        name: 'chooseTopic',
        component: chooseTopic
    },
    {
        path: '/mypost',
        name: 'mypost',
        component: mypost
    },
    {
        path: '/mine',
        name: 'mine',
        component: mine
    },
    {
        path: '/Account_security',
        name: 'Account_security',
        component: Account_security
    }, {
        path: '/shield',
        name: 'shield',
        component: shield
    }, {
        path: "/unboundPhone",
        name: 'unboundPhone',
        component: unboundPhone
    }, {
        path: '/cancel_account',
        name: 'cancel_account',
        component: cancel_account
    }, {
        path: '/mine',
        name: 'mine',
        component: mine
    }, {
        path: '/search',
        name: 'search',
        component: search
    }, {
        path: "/Amusing",
        name: 'Amusing',
        component: Amusing
    }, {
        path: '/contact',
        name: 'contact',
        component: contact
    }, {
        path: '/report',
        name: 'report',
        component: report

    }, {
        path: '/block_topics',
        name: 'block_topics',
        component: block_topics
    },

    {
        path: '/searchResult',
        name: 'searchResult',
        component: searchResult
    },
    {
        path: '/myFans',
        name: 'myFans',
        component: myFans
    },

    {
        path: '/myCare',
        name: 'myCare',
        component: myCare
    },
    {
        path: '/myMessageList',
        name: 'myMessageList',
        component: myMessageList
    },
    {
        path: '/myNoticeList',
        name: 'myNoticeList',
        component: myNoticeList
    },
    {
        path: "/OthersUserInfo",
        name: 'OthersUserInfo',
        component: others
    },
    {
        path: "/videoCache",
        name: 'videoCache',
        component: videoCache
    },



];

const router = new VueRouter({
    mode: 'hash', // app必须为hash模式，否则白屏
    base: process.env.BASE_URL,
    routes
})


Vue.use(Navigation, { router })
export default router
