import React from 'react';
import { HOME } from '../router/constants';
import {
  FileDoneOutlined,
  VerifiedOutlined,
  TranslationOutlined,
  RocketOutlined,
  UserOutlined,
  MacCommandOutlined,
  CarOutlined,
} from '@ant-design/icons';

export const HOME_SIDER_MENU_LIST = [
  {
    path: HOME.ACCOUNT.path,
    icon: <UserOutlined />,
    name: HOME.ACCOUNT.name,
  },
  {
    path: HOME.AIRCRAFT.path,
    icon: <RocketOutlined />,
    name: HOME.AIRCRAFT.name,
  },
  {
    path: HOME.AIRCRAFT_TYPE.path,
    icon: <FileDoneOutlined />,
    name: HOME.AIRCRAFT_TYPE.name,
  },
  {
    path: HOME.AIRPORT.path,
    icon: <CarOutlined />,
    name: HOME.AIRPORT.name,
  },
  {
    path: HOME.AIRWAY.path,
    icon: <VerifiedOutlined />,
    name: HOME.AIRWAY.name,
  },
  {
    path: HOME.FLIGHT.path,
    icon: <TranslationOutlined />,
    name: HOME.FLIGHT.name,
  },
  {
    path: HOME.TICKET.path,
    icon: <MacCommandOutlined />,
    name: HOME.TICKET.name,
  },
];
