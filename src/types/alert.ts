export interface AlertFeature {
  properties: {
    id: string;
    event: string;
    severity: string;
    areaDesc: string;
    effective: string;
    expires: string;
    status: string;
    headline: string;
    description: string;
  };
}

export interface AlertResponse {
  features: AlertFeature[];
}
