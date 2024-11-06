export function formatDate(dateString, options) {
  const date = new Date(dateString);
  const defaultTimeZoneOptions = options?.hour
    ? {
      timeZoneName: 'shortGeneric',
      timeZone: 'Asia/Beijing',
    }
    : {};

  return new Intl.DateTimeFormat("zh-CN", {
    ...defaultTimeZoneOptions,
    ...options,
  }).format(date);
}
