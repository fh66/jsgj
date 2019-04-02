import axios  from 'axios'
var uniteaxios ={}
uniteaxios.install =function(Vue){
  axios.defaults.baseURL='https://test.jieshui.xin/autoInvoice/'
  Vue.prototype.$http=axios
}


export default uniteaxios