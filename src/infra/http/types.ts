export type HttpResponse = {
  status: number;
  message?: string;
  data?: Record<string, unknown>;
};

export interface UseCase {
  execute(input: Record<string, unknown>): Promise<HttpResponse>;
}

export interface Controller {
  create: () => UseCase;
}
