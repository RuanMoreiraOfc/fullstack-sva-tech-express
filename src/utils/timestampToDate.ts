export default timestampToDate;

function timestampToDate(possibleTimestamp: unknown) {
  const timestamp = Number(possibleTimestamp);
  const isInvalidTimestamp = Number.isNaN(timestamp);

  if (isInvalidTimestamp) {
    return undefined;
  }

  return new Date(timestamp);
}
