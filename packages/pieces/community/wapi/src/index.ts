import { createPiece, PieceAuth, Property } from "@activepieces/pieces-framework";
import { sendMessage } from "./lib/actions/send-message";

export const wapiAuth = PieceAuth.CustomAuth({
  required: true,
  description: "Enter the token and session ID.",
  props: {
    baseUrl: Property.ShortText({
      displayName: "Base URL",
      description: "Base URL of your WhasApi instance.",
      required: true,
    }),
    token: PieceAuth.SecretText({
      displayName: 'API Key',
      description: 'Enter the **X-API-Key** token.',
      required: true,
    }),
    session: Property.ShortText({
      displayName: 'Session ID',
      description: 'The phone number of your WhatsApp account.',
      required: true,
    }),
  }
})

export const wapi = createPiece({
  displayName: "Wapi",
  auth: wapiAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: "https://cdn.activepieces.com/pieces/whatsapp.png",
  authors: [],
  actions: [sendMessage],
  triggers: [],
});
    