import { WhatsappClientBuilder } from '~/services/whatsapp/client';
import { Formatters } from '~/shared/utils/formatters';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTIFICATION_TYPE = 'first-invite';
const BASE_INVITE_LINK = 'https://abner-e-mayara.vercel.app';

type NotificationInput = {
  recipient: string;
  message: string;
  guestId: string;
};

function saveNotification(input: NotificationInput) {
  return prisma.notification.create({
    data: {
      ...input,
      type: NOTIFICATION_TYPE,
      channel: 'whatsapp',
    },
  });
}

function getNotifications(guestId: string, type?: string) {
  return prisma.notification.findFirst({ where: { guestId, type } });
}

function getLink(inviteId: string) {
  return `${BASE_INVITE_LINK}/i/${inviteId}`;
}

function mountMessage(link: string, guestName: string) {
  return `Oii ${guestName}, caso não reconheça o número aqui é o Abner e a Mayara 🤗

É com muita alegria que compartilhamos um momento muito especial: o nosso casamento! gostaríamos de tê-los ao nosso lado nessa celebração única.

Para confirmar sua presença e nos ajudar com todos os detalhes, pedimos que clique no link abaixo e preencha a confirmação de presença:

${link}

Mal podemos esperar para encontrar você no grande dia!

Se tiver alguma dúvida, fique à vontade para nos chamar.

Com carinho, Abner e Mayara 💍❤️`;
}

(async () => {
  const invites = await prisma.invite.findMany({
    where: { status: 'waiting' },
    include: { guest: true },
  });

  console.info('Configuring WhatsApp adapter');
  const adapter = await WhatsappClientBuilder.build('web');
  console.info('Finished WhatsApp adapter');

  for await (const invite of invites) {
    const { guest } = invite;
    if (!guest) continue;

    if (invite.status !== 'waiting') {
      console.info(
        `Invite for guest ${guest.name} is with status ${invite.status} and not "waiting"`,
      );
      continue;
    }

    try {
      console.info(`Starting send notification for guest ${guest.name} and invite ${invite.id}`);
      const alreadyNotificated = await getNotifications(guest.id, NOTIFICATION_TYPE);
      if (!!alreadyNotificated) {
        console.info(`Already notificated guest ${guest.name} for this type of notification`);
        continue;
      }

      const phone = Formatters.phone(guest.phone || '');
      if (!phone) {
        console.info(`Invalid phone for guest ${guest.name}`);
        continue;
      }

      const link = getLink(invite.id);
      const message = mountMessage(link, guest.name);
      console.info(`Sent notification for guest ${guest.name}`);

      await adapter.sendMessage(message, phone);

      await saveNotification({
        message,
        guestId: guest.id,
        recipient: phone,
      });

      console.info(`Saved notification for guest ${guest.name}`);

      await new Promise((resolve) => setTimeout(resolve, 5_000));
    } catch (e) {
      console.info(`Error sending notification for guest ${guest.name}`, e);
    }
  }
})();
