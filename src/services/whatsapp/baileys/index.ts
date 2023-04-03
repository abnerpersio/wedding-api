import { WhatsappClient } from '~/services/whatsapp/types';

import makeWASocket, { useMultiFileAuthState } from '@adiwajshing/baileys';

// TODO: implement this class
export class BaileysClientAdapter implements WhatsappClient {
  private socket!: ReturnType<typeof makeWASocket>;

  async build() {
    const { state: auth, saveCreds: saveCredentials } = await useMultiFileAuthState(
      '.baileys-cache',
    );

    this.socket = makeWASocket({ printQRInTerminal: true, auth });

    this.socket.ev.on('creds.update', saveCredentials);

    this.socket.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        console.log('opened connection');
        return;
      }

      if (connection === 'close' && lastDisconnect) {
        console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ');
        // reconnect if not logged out
        // connectToWhatsApp();
      }
    });

    this.socket.ev.on('messages.upsert', async (m) => {
      console.log(JSON.stringify(m, undefined, 2));
      // console.log('replying to', m.messages[0].key.remoteJid);
      // await socket.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' });
    });

    return this;
  }

  async sendMessage(message: string) {
    // const id = '5519974198800@s.whatsapp.net';
    // const buttons = [
    //   { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
    //   { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 },
    //   { buttonId: 'id3', buttonText: { displayText: 'Button 3' }, type: 1 },
    // ];
    // this.socket.sendMessage(id, {
    //   text: message,
    //   footer: 'Hello World',
    //   buttons: buttons,
    // });
  }
}
