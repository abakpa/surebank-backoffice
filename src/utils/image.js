import { url } from "../redux/sagas/url";

export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return `${url}${imagePath}`;
};
