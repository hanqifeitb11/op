import 'lib-flexible/flexible.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import "video.js/dist/video-js.css";
import VueVideoPlayer from 'vue-video-player';


import "vue-video-player/src/custom-theme.css";
import '@/assets/safeArea.less'
// console.log(VueAwesomeSwiper)
import Vue from 'vue';
import {
    Switch,
    Divider,
    ImagePreview,
    Lazyload,
    Swipe,
    SwipeItem,
    Search,
    Overlay,
    Button,
    NavBar,
    Field,
    Icon,
    Tabbar,
    Tabs,
    Tab,
    PasswordInput,
    NumberKeyboard,
    TabbarItem,
    Popup,
    Area,
    ActionSheet,
    Checkbox,
    CheckboxGroup,
    Cell,
    CellGroup,
    Image,
    PullRefresh,
    List,
    Grid,
    GridItem,
    DatetimePicker,
    Dialog,
    Empty,
} from 'vant';
Vue.use(Divider),
Vue.use(Switch),
Vue.use(Lazyload),
Vue.use(Swipe),
Vue.use(ImagePreview),
Vue.use(SwipeItem),
Vue.use(Empty)
Vue.use(Field),
Vue.use(Search),
Vue.use(Overlay),
Vue.use(VueVideoPlayer)
Vue.use(PasswordInput),
Vue.use(NumberKeyboard),
Vue.use(Button);
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(List);
Vue.use(Image);
Vue.use(Popup)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(Grid),
    Vue.use(GridItem)
Vue.use(Tabs)
Vue.use(DatetimePicker)
Vue.use(Tab)
Vue.use(TabbarItem)
Vue.use(Area)
Vue.use(ActionSheet)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Cell)
Vue.use(PullRefresh)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


