import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    name: 'Customer',
    meta: { title: '客户管理', icon: 'example' },
    children: [
      {
        path: 'customer-management',
        name: 'Customer-management',
        component: () => import('@/views/Customer-management/index'),
        meta: { title: '租客信息', icon: 'table' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  }
]
