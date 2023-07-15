export interface TreeAttempt {
  time: number;
  nextTime: number;
  diff: {
    sec: number;
    min: number;
  };
  numberAttmp: number;
  diffFromStart: {
    sec: number;
    min: number;
  };
}

interface CurrencyPair {
  base: string;
  quote: string;
}

function isExpired(currentTime: number, nextTime: number): boolean {
  const currentTimeStamp = new Date().getTime();
  return currentTimeStamp >= nextTime;
}

function generateTreeAttemptTimes(
  numAttempts: number,
  timePeriod: { sec: number; minutes: number },
): TreeAttempt[] {
  const maxTimeInterval = timePeriod.minutes * 60 - timePeriod.sec;

  const treeAttemptTimes: TreeAttempt[] = [];
  let currentTime = new Date().getTime();
  let elapsedTime = 0;

  for (let i = 0; i < numAttempts - 1; i++) {
    const timeInterval = Math.floor(Math.random() * maxTimeInterval) +
      timePeriod.sec * 1000;
    const nextTime = currentTime + timeInterval;
    const diffInSeconds = (nextTime - currentTime) / 1000;
    const diffInMinutes = diffInSeconds / 60;

    const diffFromStartInSeconds = elapsedTime;
    const diffFromStartInMinutes = diffFromStartInSeconds / 60;

    treeAttemptTimes.push({
      time: currentTime,
      nextTime: nextTime,
      diff: {
        sec: diffInSeconds,
        min: diffInMinutes,
      },
      numberAttmp: i + 1,
      diffFromStart: {
        sec: diffFromStartInSeconds,
        min: diffFromStartInMinutes,
      },
    });

    currentTime = nextTime;
    elapsedTime += diffInSeconds;
  }

  const lastTimeInterval = timePeriod.minutes * 60 - elapsedTime;
  const lastNextTime = currentTime + lastTimeInterval * 1000;
  const lastDiffInSeconds = (lastNextTime - currentTime) / 1000;
  const lastDiffInMinutes = lastDiffInSeconds / 60;
  const lastDiffFromStartInSeconds = elapsedTime;
  const lastDiffFromStartInMinutes = lastDiffFromStartInSeconds / 60;

  treeAttemptTimes.push({
    time: currentTime,
    nextTime: lastNextTime,
    diff: {
      sec: lastDiffInSeconds,
      min: lastDiffInMinutes,
    },
    numberAttmp: numAttempts,
    diffFromStart: {
      sec: lastDiffFromStartInSeconds,
      min: lastDiffFromStartInMinutes,
    },
  });

  console.log(
    "Elapsed time:",
    (elapsedTime + lastDiffInSeconds).toFixed(2),
    "seconds",
  );

  return treeAttemptTimes;
}

export default {
  generateTreeAttemptTimes,
  isExpired,
};
