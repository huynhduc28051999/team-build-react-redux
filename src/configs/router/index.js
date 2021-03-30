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
    path: '/detailGroup/:_id',
    component: 'detailGroup'
  },
  {
    isExact: true,
    path: '/events',
    component: 'events',
  },
  {
    isExact: true,
    path: '/detailEvent/:_id',
    component: 'detailEvent',
  },
  {
    isExact: true,
    path: '/searchEvent',
    component: 'searchEvent',
  },
  {
    isExact: true,
    path: '/reportUser',
    component: 'reportUser',
  },
  {
    isExact: true,
    path: '/reportEvent',
    component: 'reportEvent',
  },
  {
    isExact: true,
    path: '/reportUserEvent',
    component: 'reportUserEvent',
  },
]

export const menuRouteAdmin = [
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
      }
    ]
  },
  {
    title: 'Tìm kiếm',
    childs: [
      {
        name: 'Tìm kiếm sự kiện',
        path: '/searchEvent'
      }
    ]
  },
  {
    title: 'Báo cáo',
    childs: [
      {
        name: 'Thống kê nhân viên',
        path: '/reportUser'
      }
    ]
  }
]

export const menuRouteUser = [
  {
    title: 'Tìm kiếm',
    childs: [
      {
        name: 'Tìm kiếm sự kiện',
        path: '/searchEvent'
      }
    ]
  }
]

export const menuRouteManager = [
  {
    title: 'Quản lý',
    childs: [
      {
        name: 'Sự kiện',
        path: '/events'
      }
    ]
  },
  {
    title: 'Tìm kiếm',
    childs: [
      {
        name: 'Tìm kiếm sự kiện',
        path: '/searchEvent'
      }
    ]
  },
  {
    title: 'Báo cáo',
    childs: [
      {
        name: 'Thống kê sự kiện',
        path: '/reportEvent'
      },
      
      {
        name: 'Thống kê sự kiện theo nhân viên',
        path: '/reportUserEvent'
      }
    ]
  }
]
