export type HttpResponse = {
  status: number;
  message?: string;
  data?: Record<string, unknown>;
};
