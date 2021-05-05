import React from 'react'
import { HOME } from '../router/constants';
import {
  HomeOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  ScheduleOutlined,
} from '@ant-design/icons'

export const HOME_SIDER_MENU_LIST = [
  {
    path: HOME.ACCOUNT.path,
    icon: <HomeOutlined />,
    name: HOME.ACCOUNT.name
  },
  {
    path: HOME.AIRCRAFT.path,
    icon: <ClockCircleOutlined />,
    name: HOME.AIRCRAFT.name
  },
  {
    path: HOME.AIRCRAFT_TYPE.path,
    icon: <FileDoneOutlined/>,
    name: HOME.AIRCRAFT_TYPE.name
  },
  {
    path: HOME.AIRPORT.path,
    icon: <ScheduleOutlined/>,
    name: HOME.AIRPORT.name
  },
  {
    path: HOME.AIRWAY.path,
    icon: <ScheduleOutlined/>,
    name: HOME.AIRWAY.name
  },
  {
    path: HOME.FLIGHT.path,
    icon: <ScheduleOutlined/>,
    name: HOME.FLIGHT.name
  },
  {
    path: HOME.TICKET.path,
    icon: <ScheduleOutlined/>,
    name: HOME.TICKET.name
  },
]

