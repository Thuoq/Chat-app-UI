import user1 from "@/assets/images/users/user-1.jpg";
import { format } from "date-fns";
export function getAvatarSrc(avatarUrl) {
  if (avatarUrl) return avatarUrl;
  return user1;
}
export const formatDateTimeChat = (timeString) =>
  format(new Date(timeString), "h:mm a");
