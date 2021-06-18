import React from 'react';
import './style.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import AccountList from '../../../../components/account/account-list';
import { getAllAccounts } from 'apps/aircraft-admin/src/app/store/actions/account';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { Spin } from 'antd';
import { adminGetProfileUser } from 'apps/aircraft-admin/src/app/services';


const Account = function () {
  const account = useSelector((state: StoreState) => state.account);
  const dispatch = useDispatch();
  const [profileUserID, setProfileUserID] = React.useState([]);
  const [params, setParams] = React.useState({
    page: 0,
    size: 10,
    email: '',
    sort: ['id', 'asc'],
  });

  async function getAllUserProfile() {
    const userHasProfiles = await adminGetProfileUser();
    if (userHasProfiles.data) {
      const userID = userHasProfiles.data.map((ele) => ele.user.id);
      setProfileUserID(userID);
    }
  }

  React.useEffect(() => {
    getAllAccounts(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
    getAllUserProfile();
  }, [getAllAccounts, params]);

  return account.isLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (
    <div>
      <AccountList
        loading={account.isLoading}
        profileUserID={profileUserID}
        accounts={account.accounts}
      />
    </div>
  );
};

const mapStateToProps = ({ account }: StoreState) => {
  return { account };
};
export default (Account);
