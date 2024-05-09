import { combineReducers } from 'redux';

// Layout
import LayoutReducer from './layouts/reducer';

// Auth
import AuthReducer from './auth/reducer';

// Permission
import permissionReducer from './permissions/reducer';

// Role
import roleReducer from './roles/reducer';

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Auth: AuthReducer,
  Permission: permissionReducer,
  Role: roleReducer,
});

export default rootReducer;
