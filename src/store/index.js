import Vue from 'vue'
import Vuex from 'vuex'
import scroll from '@/store/modules/scroll.js'
import user from '@/store/modules/user.js'
import navget from '@/store/modules/navget.js'
import getMenuList from '@/store/modules/user.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        scroll,
        user,
        navget
    }
});
export default store;
