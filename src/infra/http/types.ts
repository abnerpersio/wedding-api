export type Credentials = {};

export type HttpResponse<R = unknown> = {
  status: number;
  message?: string;
  data?: R;
};

export interface UseCase<I = Record<string, unknown>, R = unknown> {
  execute(input: I, credentials: Credentials): Promise<HttpResponse<R>>;
}
