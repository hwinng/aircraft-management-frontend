import React from 'react'
import './style.scss'
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { IUserInfo } from '../../../../store/reducers/auth';
import AccountList from '../../../../components/account/account-list';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getAllAccounts } from 'apps/aircraft-admin/src/app/store/actions/account';
import { StoreState } from 'apps/aircraft-admin/src/app/store';

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type DispatchProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp & RouteComponentProps

type Props = ReturnType<typeof mapStateToProps> & DispatchProps & RouteComponentProps

const Account: React.FC<Props> = function({
  dispatch,
  account
}) {

  const [ params, setParams ] = React.useState({
    page: 0,
    size: 10,
    email: '',
    sort: ['id', 'asc']
  });

  React.useEffect(() => {
    async function initilizeData() {
      await dispatch(getAllAccounts(queryString.stringify(params)));
    };
    initilizeData();
  }, [ getAllAccounts, params ]);

  return (
    <div>
      <AccountList accounts={account.accounts} />
    </div>
  )
}

const mapStateToProps = ({ account }: StoreState ) => {
  return { account }
}
export default connect(mapStateToProps)(Account)
