import { combineReducers } from 'redux';

// Layout
import LayoutReducer from './layouts/reducer';

// Auth
import AuthReducer from './auth/reducer';

// Permission
import permissionReducer from './permissions/reducer';

// Role
import roleReducer from './roles/reducer';

// Admin
import adminReducer from './admins/reducer';

// User
import userReducer from './users/reducer';

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Auth: AuthReducer,
  Permission: permissionReducer,
  Role: roleReducer,
  Admin: adminReducer,
  User: userReducer,
});

export default rootReducer;
