import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/index').default
    },
    {
      path: '/compress',
      name: 'compress-file',
      component: require('@/components/compressFile').default
    },
    {
      path: '/fileList',
      name: 'file-list',
      component: require('@/components/fileList').default
    },
    {
      path: '/uncompress',
      name: 'uncompress-file',
      component: require('@/components/uncompressFile').default
    },
    {
      path: '/helper',
      name: 'helper',
      component: require('@/components/helper').default
    }
  ]
})
