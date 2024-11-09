import dayjs from 'dayjs';

export function formatDate(dateString, format = 'YYYY-MM-DD') {
  const date = new Date(dateString);
  return dayjs(date).format(format);
}

export function parseDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}
