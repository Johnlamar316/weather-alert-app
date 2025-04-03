export enum SeverityColor {
  Extreme = 'error',
  Severe = 'warning',
  Moderate = 'info',
  Minor = 'success',
  Unknown = 'default',
}

export enum AlertSeverity {
  Extreme = 'Extreme',
  Severe = 'Severe',
  Moderate = 'Moderate',
  Minor = 'Minor',
  Unknown = 'Unknown',
}

export enum AlertStatus {
  Actual = 'Actual',
  Exercise = 'Exercise',
  System = 'System',
  Test = 'Test',
  Draft = 'Draft',
}

export const severityOptions: ('' | AlertSeverity)[] = [
  '',
  AlertSeverity.Extreme,
  AlertSeverity.Severe,
  AlertSeverity.Moderate,
  AlertSeverity.Minor,
  AlertSeverity.Unknown,
];

export const statusOptions: ('' | AlertStatus)[] = [
  '',
  AlertStatus.Actual,
  AlertStatus.Exercise,
  AlertStatus.System,
  AlertStatus.Test,
  AlertStatus.Draft,
];
