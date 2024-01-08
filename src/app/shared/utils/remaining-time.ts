import { UTCDate } from '@date-fns/utc';
import {
  addMinutes,
  differenceInMilliseconds,
  format,
  isBefore,
} from 'date-fns';

export function remainingTime(createdAt: string, duration: number) {
  const dueDate = addMinutes(new UTCDate(createdAt).toString(), duration);
  const now = new Date();
  if (!isBefore(now, dueDate)) {
    return 'Czas minął';
  }
  const result = differenceInMilliseconds(dueDate, now);
  const timer = format(new UTCDate(result), 'HH:mm:ss');
  return timer;
}

export function isTimeLeft(createdAt: string, duration: number) {
  const dueDate = addMinutes(new UTCDate(createdAt).toString(), duration);
  const now = new Date();
  return isBefore(now, dueDate);
}

export function timeToMinutes(time: string) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return Math.ceil(hours * 60 + minutes + seconds / 60);
}
