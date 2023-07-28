export const endDate = new Date(2023, 10, 31, 0, 0, 0);

export function timer(end: Date) {
  const restSeconds = Math.floor((end.getTime() - new Date().getTime())/1000);
  const restDays = Math.floor(restSeconds/3600/24);
  const restHours = Math.floor((restSeconds/3600/24 - restDays)*24);
  const restMins = Math.floor(((restSeconds/3600/24 - restDays)*24 - restHours)*60);
  const restSecs = Math.floor((((restSeconds/3600/24 - restDays)*24 - restHours)*60 - restMins)*60);
  return restDays + ' дней, ' + restHours + ':' + restMins + ':' + restSecs;
}
