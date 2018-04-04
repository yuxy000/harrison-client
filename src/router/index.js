import Vue from 'vue'
import Router from 'vue-router'
import RecordList from '@/components/RecordList'
import EntryHealthRecord from '@/components/EntryHealthRecord'
import ShowHealthRecord from '@/components/ShowHealthRecord'

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
    },
    {
      path: '/entry-record/:id',
      name: 'EntryHealthRecord',
      component: EntryHealthRecord    
    },
    {
      path: '/show-record/:id',
      name: 'ShowHealthRecord',
      component: ShowHealthRecord    
    }
  ]
})
