const OLD_MEDIA = /^https?:\/\/(?:www\.)?atlantaworld\.in\/admin\/products\//i;

export function mediaUrl(url?: string | null) {
  if (!url) return "";
  return url.replace(OLD_MEDIA, "/admin/products/");
}

export function withProductMedia<T extends {
  image?: string;
  gallery?: string[];
  colors?: Array<{ image?: string }>;
}>(item: T): T {
  return {
    ...item,
    image: item.image ? mediaUrl(item.image) : item.image,
    gallery: item.gallery?.map((src) => mediaUrl(src)),
    colors: item.colors?.map((color) => ({
      ...color,
      image: color.image ? mediaUrl(color.image) : color.image,
    })),
  };
}
