const formatToLocal = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export { formatToLocal };
