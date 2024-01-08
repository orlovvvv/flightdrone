import * as moment from 'moment';
import 'moment-duration-format';

export function remainingTime(createdAt: string, duration: string) {
  var dueDate = moment(createdAt).add(duration, 'minutes');
  var now = moment().utc(false);
  if (!moment(now).isBefore(dueDate)) {
    return 'Czas minął';
  }
  var diff_s = dueDate.diff(now, 'seconds');
  return moment.duration(diff_s, 'seconds').format('HH:mm:ss').toString();
}
