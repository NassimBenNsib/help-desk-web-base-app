import { Router } from "../../../lib/external.lib";
import { Middleware, UsersRoleEnum } from "../../../lib/internal.lib";
import { USERS_APIS_SETTINGS_CONFIG, UsersSettingsControllers } from ".";
import { UsersSettingsSchemasValidation } from "./users.schemas";

const UsersSettingsRoutes = Router();

UsersSettingsRoutes.put(
  USERS_APIS_SETTINGS_CONFIG.changeGeneralInformation,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(
    UsersSettingsSchemasValidation.changeGeneralInformation
  ),
  UsersSettingsControllers.changeGeneralInformation
);

UsersSettingsRoutes.put(
  USERS_APIS_SETTINGS_CONFIG.revokeSessions,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(
    UsersSettingsSchemasValidation.revokeSessions
  ),
  UsersSettingsControllers.revokeSessions
);

UsersSettingsRoutes.put(
  USERS_APIS_SETTINGS_CONFIG.changeEmailPreference,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(
    UsersSettingsSchemasValidation.changeEmailPreference
  ),
  UsersSettingsControllers.changeEmailPreference
);

UsersSettingsRoutes.put(
  USERS_APIS_SETTINGS_CONFIG.changeNotificationPreference,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(
    UsersSettingsSchemasValidation.changeNotificationPreference
  ),
  UsersSettingsControllers.changeNotificationPreference
);

UsersSettingsRoutes.put(
  USERS_APIS_SETTINGS_CONFIG.changePassword,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(
    UsersSettingsSchemasValidation.changePassword
  ),
  UsersSettingsControllers.changePassword
);

UsersSettingsRoutes.put(
  USERS_APIS_SETTINGS_CONFIG.changeGeneralPreference,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(
    UsersSettingsSchemasValidation.changeGeneralPreference
  ),
  UsersSettingsControllers.changeGeneralPreference
);

UsersSettingsRoutes.post(
  USERS_APIS_SETTINGS_CONFIG.getProfile,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(UsersSettingsSchemasValidation.getProfile),
  UsersSettingsControllers.getProfile
);

UsersSettingsRoutes.put(
  USERS_APIS_SETTINGS_CONFIG.changeProfilePicture,
  Middleware.authorize(
    [UsersRoleEnum?.ADMIN, UsersRoleEnum.USER, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(
    UsersSettingsSchemasValidation.changeProfilePicture
  ),
  Middleware.fileUploader("IMAGES"),
  UsersSettingsControllers.changeProfilePicture
);

const UsersRoutes = Router();

export { UsersSettingsRoutes, UsersRoutes };
