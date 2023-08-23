import { Router, z } from "../../../lib/external.lib";
import { Middleware, UsersRoleEnum } from "../../../lib/internal.lib";
import { AUTH_APIS_CONFIG, AuthControllers } from "./";
import { AuthSchemasValidation } from "./auth.schemas";

const AuthRoutes = Router();

AuthRoutes.post(
  AUTH_APIS_CONFIG.register,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    true
  ),
  Middleware.requestDataValidator(AuthSchemasValidation.register),
  AuthControllers.register
);

AuthRoutes.post(
  AUTH_APIS_CONFIG.login,
  Middleware.authorize(
    [UsersRoleEnum.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    true
  ),
  Middleware.requestDataValidator(AuthSchemasValidation.login),
  AuthControllers.login
);

AuthRoutes.post(
  AUTH_APIS_CONFIG.logout,
  Middleware.authorize(
    [UsersRoleEnum.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(AuthSchemasValidation.logout),
  AuthControllers.logout
);

AuthRoutes.post(
  AUTH_APIS_CONFIG.forgotPassword,
  Middleware.authorize(
    [UsersRoleEnum.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    true
  ),
  Middleware.requestDataValidator(AuthSchemasValidation.forgotPassword),
  AuthControllers.forgotPassword
);

AuthRoutes.put(
  AUTH_APIS_CONFIG.resetPassword,
  Middleware.authorize(
    [UsersRoleEnum.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    true
  ),
  Middleware.requestDataValidator(AuthSchemasValidation.resetPassword),
  AuthControllers.resetPassword
);

export { AuthRoutes };
