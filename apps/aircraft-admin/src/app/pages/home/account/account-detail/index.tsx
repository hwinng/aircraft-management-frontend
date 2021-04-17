import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import './style.scss';

import AccountDetail from '../../../../components/account/account-detail'
import{ useLocation } from 'react-router';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getAccountById } from 'apps/aircraft-admin/src/app/store/actions/account';

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type DispatchProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp
type ProfileProps = ReturnType<typeof mapStateToProps> & DispatchProps

const AccountDetailContainer: React.FC<ProfileProps> = function({
  account,
  dispatch,
}) {
  const location = useLocation();
  const paramId = Number(location.pathname.slice('/home/account/detail/'.length));

  React.useEffect(() => {
    async function initilizeData() {
      await dispatch(getAccountById(paramId));
    }
    initilizeData();
  },[ getAccountById, paramId])

  return (
    <div>
      <AccountDetail account={account} />
    </div>
  )
}

const mapStateToProps = ( { account }: StoreState ) => ({
  account
})
export default connect(mapStateToProps)(AccountDetailContainer)
