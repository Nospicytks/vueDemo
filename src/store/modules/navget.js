import { getMenuList } from '@/api/request'
import {Modal, notification} from 'ant-design-vue'

const state={
  baseurl:'http://park.chinay.work/admin/',
  userInfo:{},
  navList:[]
};
const getters={

}
const mutations={
  // 获取菜单
    MenuList(state){
        getMenuList()
          .then( res=> {
            if(res.data.code == 200){
              state.navList = res.data.data
            }else{
              Modal.error({
                title: '获取菜单失败',
                content: res.data.msg,
                mask: false,
                onOk: () => {
                  routerfrom.push('/')
                }
              })
            }
          })
    }
}
const actions={

}
export default{
    getters,
    mutations,
    actions,
    state
}
