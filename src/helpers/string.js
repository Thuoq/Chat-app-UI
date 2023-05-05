import user1 from "@/assets/images/users/user-1.jpg";
export function getAvatarSrc(avatarUrl) {
  if (avatarUrl) return avatarUrl;
  return user1;
}

// getImageUrl
