import { HttpResponse, UseCase } from '~/infra/http/types';
import { WhatsappClientBuilder } from '~/services/whatsapp/client';
import { CreateResponse } from '~/shared/utils/create-reponse';

export class SendMessageUseCase implements UseCase {
  async execute(input: Record<string, unknown>): Promise<HttpResponse> {
    const adapter = await WhatsappClientBuilder.build('baileys');

    adapter.sendMessage('Mensagem');

    return CreateResponse.ok();
  }
}
