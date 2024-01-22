import confirmationRequiredPagesConfig from "./confirmation-required/confirmationRequiredPagesConfig";
import forgotPasswordPagesConfig from "./forgot-password/forgotPasswordPagesConfig";
import resetPasswordPagesConfig from "./reset-password/resetPasswordPagesConfig";
import unlockSessionPagesConfig from "./unlock-session/unlockSessionPagesConfig";

const authenticationPagesConfigs = [
  forgotPasswordPagesConfig,
  resetPasswordPagesConfig,
  confirmationRequiredPagesConfig,
  unlockSessionPagesConfig,
];

export default authenticationPagesConfigs;
