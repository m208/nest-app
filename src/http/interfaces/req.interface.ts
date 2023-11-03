export interface ReqExample {
  readonly userId: number;
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
}

export interface PostExample {
  title: string;
  body: string;
  userId: number;
}

export interface WeatherTimelineResponse {
  address: string;
  description: string;
  days: Array<{
    datetime: string;
    description: string;
  }>;
}
