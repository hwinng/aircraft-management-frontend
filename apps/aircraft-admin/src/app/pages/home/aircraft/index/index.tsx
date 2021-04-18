import React from 'react'
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getAllAirCrafts } from '../../../../store/actions/aircraft';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import AirCraftList from '../../../../components/aircraft/list';


type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type DispatchProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp & RouteComponentProps

type Props = ReturnType<typeof mapStateToProps> & DispatchProps & RouteComponentProps

const AirCraft: React.FC<Props> = function({
  dispatch,
  aircraft
}) {

  const [ params, setParams ] = React.useState({
    page: 0,
    size: 10,
    email: '',
    sort: ['id', 'asc']
  });

  React.useEffect(() => {
    async function initilizeData() {
      await dispatch(getAllAirCrafts(queryString.stringify(params)));
    };
    initilizeData();
  }, [ getAllAirCrafts, params ]);

  return aircraft.loading
    ?(<div>Loading...</div>)
    :(
      <div>
        <AirCraftList craft={aircraft} />
      </div>
    )
}

const mapStateToProps = ({ aircraft }: StoreState ) => {
  return { aircraft }
}

export default connect(mapStateToProps)(AirCraft)
