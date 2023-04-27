export const calculateStartTime = (reverseCount, providedTimeLimit) => {
  if (reverseCount) {
    return providedTimeLimit * 60000;
  }
  return 0;
};
