import React, { Suspense, lazy, useContext, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { authenticatedRoutes, nonAuthenticatedRoutes } from '@configs'
import { Loading, PublicRoute, PrivateRoute} from '@components'
import './app.scss'
import { useSelector } from 'react-redux'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { SocketContext } from '@utils/socket'

const Components = {}
for (const c of authenticatedRoutes) {
  Components[c.component] = lazy(() => import(`./` + c.component))
}

for (const c of nonAuthenticatedRoutes) {
  Components[c.component] = lazy(() => import("./" + c.component))
}

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const context = useContext(SocketContext)
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('access-token')
      context.connect(token)
    } else {
      if (context.socket?.connected) context.socket.disconnect()
    }
  }, [isAuthenticated, context.socket])
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Switch>
          {nonAuthenticatedRoutes.map(c => {
            // Route khong can bao ve, nhung khong duoc truy cap khi da authenticated
            const C = Components[c.component];
            return (
              <Route
                key={c.path}
                exact={c.isExact}
                path={c.path}
                render={(props) => (
                  <PublicRoute isAuth={isAuthenticated}>
                    <C {...props} />
                  </PublicRoute>
                )}
              />
            );
          })}
          {authenticatedRoutes.map(c => {
            const C = Components[c.component];
            return (
              <Route
                key={c.path}
                exact={c.isExact}
                path={c.path}
                render={(props) => (
                  // Bao ve Route can authentication bang Redirect
                  <PrivateRoute {...props} isAuth={isAuthenticated}>
                    <C {...props} />
                  </PrivateRoute>
                )}
              />
            );
          })}
          {isAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
