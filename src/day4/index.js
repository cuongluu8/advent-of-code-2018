import { getInput } from './input';

const FallsAsleep = 'falls asleep';
const WakesUp = 'wakes up';

const parseDate = (dateString) => {
  const [ ignore, year, month, day, hour, minutes] = dateString.match(/^(\d+)-(\d+)-(\d+) (\d+):(\d+)$/).map(Number);

  return new Date(year, month - 1, day, hour, minutes, 0, 0);
};

const parseDetails = (details) => {
    if (details.startsWith('G')) {
      return {
        guardId: details.match(/^Guard #(\d+) begins shift$/).map(Number)[1]
      }
    }

    return {
      command: details
    }
};

const fillMinuteFrequency = (minuteFrequency, from, to) => {
  for (let i = from; i <= to; i++) {
    minuteFrequency[i] = minuteFrequency[i] === undefined ? 0 : minuteFrequency[i];

    minuteFrequency[i] += 1;
  }
};

const parseLog = (logs) => {
  let currentGuard = null;
  let fellAsleepAtMinute = null;

  return logs.reduce((result, log) => {
    const { guardId } = log;
    if (guardId) {
      currentGuard = guardId;
    } else {
      const { command, date } = log;

      if (command === FallsAsleep) {
        fellAsleepAtMinute = date.getMinutes();
      } else if (command === WakesUp) {
        const awakeAtMinute = date.getMinutes() - 1;
        const numMinutesAsleep = awakeAtMinute - fellAsleepAtMinute;

        result[currentGuard] = result[currentGuard] || { guardId: currentGuard, totalAsleep: 0, minuteFrequency: {} };
        result[currentGuard].totalAsleep += numMinutesAsleep;

        fillMinuteFrequency(result[currentGuard].minuteFrequency, fellAsleepAtMinute, awakeAtMinute);

        fellAsleepAtMinute = null;
      } else {
        throw new Error(`something not right ${log}`);
      }
    }

    return result
  }, {})
};

const parsedInput = getInput()
    .map((line) => {
        const [ ignore, dateStr, details ] = line.match(/^\[(.*)\] (.*)$/);

        return {
          dateStr,
          date: parseDate(dateStr),
          ...parseDetails(details)
        };
    })
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

const sortedParsedLog = Object.values(parseLog(parsedInput))
    .sort((a, b) => b.totalAsleep - a.totalAsleep);

const { guardId, minuteFrequency } = sortedParsedLog[0];

const minuteFrequencyAsArray = Object.keys(minuteFrequency)
  .map((key) => ({ minute: key, frequency: minuteFrequency[key] }))
  .sort((a, b) => b.frequency - a.frequency);

const result = guardId * parseInt(minuteFrequencyAsArray[0].minute, 10);
console.log({result});

// PART 2

const sortedParsedLogWithSortedFrequency = sortedParsedLog
  .map((log) => {
    return {
        ...log,
        minuteFrequency: Object.keys(log.minuteFrequency)
          .map((key) => ({ minute: key, frequency: log.minuteFrequency[key] }))
          .sort((a, b) => b.frequency - a.frequency)
    };
  })
  .sort((a, b) => {
    return b.minuteFrequency[0].frequency - a.minuteFrequency[0].frequency;
  });

const { guardId: guardId2, minuteFrequency: minuteFrequency2 } = sortedParsedLogWithSortedFrequency[0];

const result2 = guardId2 * parseInt(minuteFrequency2[0].minute, 10);
console.log({result2});
