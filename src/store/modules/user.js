import { homeUser } from '@/api/request'
import {Modal, notification} from 'ant-design-vue'

const state={
  baseurl:'http://park.chinay.work/admin/',
  userInfo:{}
};
const getters={

}
const mutations={
  // 获取用户信息
    getUserInfo(state){
        homeUser()
          .then( res=> {
            if(res.data.code == 200){
              state.userInfo = res.data.data
            }else{
              sessionStorage.removeItem('token')
              Modal.error({
                title: '登录已失效',
                content: '已过期',
                okText: '重新登录',
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
