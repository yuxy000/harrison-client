import Vue from 'vue'
import Router from 'vue-router'
import RecordList from '@/components/RecordList'
import EntryHealthRecord from '@/components/EntryHealthRecord'
import ShowHealthRecord from '@/components/ShowHealthRecord'
import HealthCertificateMm from '@/components/HealthCertificateMm'
import HealthCertificateBackMm from '@/components/HealthCertificateBackMm'
import Login from '@/components/Login'

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
    },
    {
      path: '/health-certificate-mm/:id',
      name: 'HealthCertificateMm',
      component: HealthCertificateMm
    },
    {
      path: '/health-certificate-back-mm',
      name: 'HealthCertificateBackMm',
      component: HealthCertificateBackMm
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})
