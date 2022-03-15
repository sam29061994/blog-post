import moment from 'moment';

export const sortByRecentDate = (date1: Date, date2: Date) => {
  return getTime(date2) - getTime(date1);
};

export const getTime = (date?: Date) => {
  return date != null ? new Date(date).getTime() : 0;
};
export const convertDateToTimeAgo = (date: Date): string => {
  return moment(date).fromNow();
};
