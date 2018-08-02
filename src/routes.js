import App from './App'
import Home from './routes/Home'
import About from './routes/About'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'

import loadData from './helpers/loadData'

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About,
    loadData: () => loadData('about')
  },
  {
    path: '/contact',
    component: Contact,
    loadData: () => loadData('contact')
  },
  {
    component: NotFound
  }
]

export default Routes