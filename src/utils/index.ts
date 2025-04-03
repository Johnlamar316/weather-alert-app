import { AlertSeverity } from 'types/enum';

// Enum-based severity gradient color map
const severityGradientTopColor: Record<AlertSeverity, string> = {
  [AlertSeverity.Extreme]: '#d32f2f',
  [AlertSeverity.Severe]: '#ed6c03',
  [AlertSeverity.Moderate]: '#1976d2',
  [AlertSeverity.Minor]: '#2e7d32',
  [AlertSeverity.Unknown]: '#607d8a',
};

const severityIconMap: Record<AlertSeverity, string> = {
  [AlertSeverity.Extreme]: '/assets/extreme.png',
  [AlertSeverity.Severe]: '/assets/extreme.png',
  [AlertSeverity.Moderate]: '/assets/minor.png',
  [AlertSeverity.Minor]: '/assets/minor.png',
  [AlertSeverity.Unknown]: '/assets/minor.png',
};

//format date and time
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

const cleanFilterFunc = (
  filters: Record<string, string | undefined | null>
): Record<string, string> => {
  return Object.keys(filters).reduce(
    (acc, key) => {
      const value = filters[key];
      if (value !== '') {
        acc[key] = value!;
      }
      return acc;
    },
    {} as Record<string, string>
  );
};

export { formatToLocal, cleanFilterFunc, severityGradientTopColor, severityIconMap };
