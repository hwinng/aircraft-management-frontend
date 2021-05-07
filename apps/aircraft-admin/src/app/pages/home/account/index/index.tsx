import React from 'react';
import './style.scss';
import { connect, useDispatch } from 'react-redux';
import queryString from 'query-string';
import AccountList from '../../../../components/account/account-list';
import { getAllAccounts } from 'apps/aircraft-admin/src/app/store/actions/account';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { Spin } from 'antd';

type Props = ReturnType<typeof mapStateToProps>;

const Account: React.FC<Props> = function ({ account }) {
  const dispatch = useDispatch();
  const [params, setParams] = React.useState({
    page: 0,
    size: 10,
    email: '',
    sort: ['id', 'asc'],
  });

  React.useEffect(() => {
    getAllAccounts(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, [getAllAccounts, params]);

  return account.isLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (
    <div>
      <AccountList loading={account.isLoading} accounts={account.accounts} />
    </div>
  );
};

const mapStateToProps = ({ account }: StoreState) => {
  return { account };
};
export default connect(mapStateToProps)(Account);
