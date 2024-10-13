import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wapiAuth } from '../..';

export const sendMessage = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'sendMessage',
  displayName: 'Send Message',
  description: 'Send message to whatsapp number using wapi',
  auth: wapiAuth,
  props: {
    to: Property.ShortText({
      displayName: "To",
      description: 'The recipient of the message',
      required: true,
    }),
    text: Property.LongText({
			displayName: 'Message',
			description: 'The message to send',
			required: true,
		}),
  },
  async run(context) {
    const { to, text } = context.propsValue;
    const { baseUrl, token, session } = context.auth;

    return await httpClient.sendRequest({
      method: HttpMethod.POST,
      url: `${baseUrl}/${session}/messages/send`,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-API-Key": token,
      },
      body: {
        jid: to,
        type: to.includes("@g.us") ? "group" : "number",
        message: {
          text,
        },
      }
    })
  },
});
