import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const formatUtcString = (utcString: string) => {
// UTC mode
  return dayjs.utc(utcString).utcOffset(8).format('YYYY-MM-DD HH:mm:ss') // 2019-03-06T00:00:00Z
}


