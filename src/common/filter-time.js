// TODO: async load moment
import moment from 'moment/min/moment.min';

export default function filterTime(time) {
  return moment.duration(time - moment.now()).humanize();
}
