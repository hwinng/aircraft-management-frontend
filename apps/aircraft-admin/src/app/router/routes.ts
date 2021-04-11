import { IRouteProps } from './types';
import { HOME } from './constants';
import Login from '../pages/login';
import Main from '../pages/home/main';
import Account from '../pages/home/account';
import NotFound from '../pages/exception/404';

const routesMap: IRouteProps[] = [
  {
    path: HOME.LOGIN.path,
    exact: true,
    component: Login,
    meta: {
      requiresAuth: false,
      title: HOME.LOGIN.name,
      isLoginToHome: true
    }
  },
  {
    path: HOME.HOME.path,
    component: Main,
    meta: {
      requiresAuth: true,
    },
    childrenRoutes: [
      {
        path: HOME.ACCOUNT.path,
        component: Account,
        exact: true,
        meta: {
          title: HOME.ACCOUNT.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRCRAFT.path,
        component: 'Aircraft',
        exact: true,
        meta: {
          title: HOME.AIRCRAFT.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRCRAFT_TYPE.path,
        component: 'AIRCRAFT_TYPE',
        meta: {
          title: HOME.AIRCRAFT_TYPE.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRPORT.path,
        component: 'AIRPORT',
        meta: {
          title: HOME.AIRPORT.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRWAY.path,
        component: 'airway',
        exact: true,
        meta: {
          title: HOME.AIRWAY.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.NOMATCH.path,
        component: NotFound,
        meta: {
          requiresAuth: true,
          title: HOME.NOMATCH.name
        }
      },
    ]
  },
  {
    path: HOME.NOMATCH.path,
    component: NotFound,
    meta: {
      requiresAuth: false,
      title: HOME.NOMATCH.name
    }
  },
]

export default routesMap
