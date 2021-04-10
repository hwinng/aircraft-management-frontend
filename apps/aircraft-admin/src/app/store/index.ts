import { UserState } from './reducers/auth';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers'
const initalState = {};

const middleware = [thunk];

// export interface StoreState {
//   auth: UserState
// }

const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
