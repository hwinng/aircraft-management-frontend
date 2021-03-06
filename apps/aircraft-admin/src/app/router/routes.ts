import { IRouteProps } from './types';
import { HOME } from './constants';
import Login from '../pages/login';
import Main from '../pages/home/main';
import Account from '../pages/home/account/index';
import AccountDetail from '../pages/home/account/account-detail';
import AirCraft from '../pages/home/aircraft/index';
import AirCraftDetail from '../pages/home/aircraft/aircraft-detail';
import CraftType from '../pages/home/aircraft-type/index';
import CreateCraftType from '../pages/home/aircraft-type/create';
import Flight from '../pages/home/flight/index';
import Airport from '../pages/home/airport/index';
import Airway from '../pages/home/airway/index';
import Ticket from '../pages/home/ticket/index';
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
        path: HOME.ACCOUNT_DETAIL.path,
        component: AccountDetail,
        exact: true,
        meta: {
          title: HOME.ACCOUNT_DETAIL.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRCRAFT.path,
        component: AirCraft,
        exact: true,
        meta: {
          title: HOME.AIRCRAFT.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRCRAFT_DETAIL.path,
        component: AirCraftDetail,
        exact: true,
        meta: {
          title: HOME.AIRCRAFT_DETAIL.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRCRAFT_TYPE.path,
        component: CraftType,
        exact: true,
        meta: {
          title: HOME.AIRCRAFT_TYPE.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRCRAFT_CREATE.path,
        component: CreateCraftType,
        exact: true,
        meta: {
          title: HOME.AIRCRAFT_CREATE.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRPORT.path,
        component: Airport,
        meta: {
          title: HOME.AIRPORT.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.AIRWAY.path,
        component: Airway,
        exact: true,
        meta: {
          title: HOME.AIRWAY.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.FLIGHT.path,
        component: Flight,
        exact: true,
        meta: {
          title: HOME.FLIGHT.name,
          requiresAuth: true,
        }
      },
      {
        path: HOME.TICKET.path,
        component: Ticket,
        exact: true,
        meta: {
          title: HOME.TICKET.name,
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
