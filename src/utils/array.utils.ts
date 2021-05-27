export const joinSentence = (arr: string[]): string => {
  if (arr.length === 0) {
    return "";
  }

  if (arr.length === 1) {
    return arr[0];
  }

  const tokens = [...arr];
  const last = tokens.pop();

  return `${tokens.join(", ")} and ${last}`;
};
