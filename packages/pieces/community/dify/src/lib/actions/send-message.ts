import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { difyAuth } from '../..';

export const sendMessage = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'sendMessage',
  displayName: 'Send Message',
  description: 'Send message to dify and get answer',
  auth: difyAuth,
  props: {
    user: Property.ShortText({
      displayName: "User",
      description: 'The recipient of the message',
      required: true,
    }),
    query: Property.LongText({
			displayName: 'Message',
			description: 'The message to send',
			required: true,
		}),
    conversation_id: Property.ShortText({
      displayName: "Conversation ID",
      description: 'ID of prev conversation',
      required: false,
    }),
  },
  async run(context) {
    const { user, query, conversation_id } = context.propsValue;
    const { baseUrl, token } = context.auth;

    return await httpClient.sendRequest({
      method: HttpMethod.POST,
      url: `${baseUrl}/v1/chat-messages`,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: {
        user,
        files: [],
        query,
        inputs: {},
        response_mode: "blocking",
        conversation_id,
      }
    })
  },
});
