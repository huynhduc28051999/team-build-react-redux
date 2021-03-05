export const nonAuthenticatedRoutes = [
  {
    isExact: true,
    path: '/login',
    component: 'login'
  }
]

export const authenticatedRoutes = [
  {
    isExact: true,
    path: '/home',
    component: 'home',
  },
  {
    isExact: true,
    path: '/profile',
    component: 'profile',
  },
  {
    isExact: true,
    path: '/groups',
    component: 'groups',
  },
  {
    isExact: true,
    path: '/users',
    component: 'users',
  },
  {
    isExact: true,
    path: '/detailGroup/:_id?',
    component: 'detailGroup'
  },
  {
    isExact: true,
    path: '/events',
    component: 'events',
  },
  {
    isExact: true,
    path: '/detailEvent/:_id?',
    component: 'detailEvent',
  },
  {
    isExact: true,
    path: '/searchEvent',
    component: 'searchEvent',
  },
]

export const menuRoute = [
  {
    title: 'Quản lý',
    childs: [
      {
        name: 'Phòng ban',
        path: '/groups'
      },
      {
        name: 'Nhân viên',
        path: '/users'
      },
      {
        name: 'Sự kiện',
        path: '/events'
      },
      {
        name: 'Tìm kiếm sự kiện',
        path: '/searchEvent'
      }
    ]
  }
]
