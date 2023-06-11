import user1 from "@/assets/images/users/user-1.jpg";
import { format } from "date-fns";
import { USER_STATUS } from "@/constant/user-status";
export function getAvatarSrc(avatarUrl) {
  if (avatarUrl) return avatarUrl;
  return user1;
}
export const formatDateTimeChat = (timeString) =>
  format(new Date(timeString), "h:mm a");
export const getUserClassStatus = (userStatusCode) => {
  return (
    USER_STATUS.find((userStatus) => userStatus.value === userStatusCode)
      ?.classBg || USER_STATUS[0].classBg
  );
};

export const getUserClassLabel = (userStatusCode) => {
  return (
    USER_STATUS.find((userStatus) => userStatus.value === userStatusCode)
      ?.label || USER_STATUS[0].label
  );
};
