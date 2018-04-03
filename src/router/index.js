import Vue from 'vue'
import Router from 'vue-router'
import RecordList from '@/components/RecordList'
import EntryHealthRecord from '@/components/EntryHealthRecord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RecordList',
      component: RecordList
    },
    {
      path: '/entry-record',
      name: 'EntryHealthRecord',
      component: EntryHealthRecord    
    }
  ]
})
