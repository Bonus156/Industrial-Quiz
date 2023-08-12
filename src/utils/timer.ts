export const endDate = new Date(2023, 9, 30, 17, 0, 0);

export function timer() {
  const restSeconds = Math.floor((endDate.getTime() - new Date().getTime())/1000);
  const restHours = Math.floor(restSeconds/3600);
  const restMins = Math.floor((restSeconds/3600 - restHours)*60);
  const restSecs = Math.floor(((restSeconds/3600 - restHours)*60 - restMins)*60);
  return restSeconds > 0 ? (restHours + ':' + String(restMins).padStart(2, '0') + ':' + String(restSecs).padStart(2, '0')) : '0';
}
