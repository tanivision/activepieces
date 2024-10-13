
    import { createPiece, PieceAuth, Property } from "@activepieces/pieces-framework";
import { sendMessage } from "./lib/actions/send-message";

    export const difyAuth = PieceAuth.CustomAuth({
      required: true,
      description: 'Please enter dify URL and API Key',
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
      }
    })
    
    export const dify = createPiece({
      displayName: "Dify",
      auth: difyAuth,
      minimumSupportedRelease: '0.20.0',
      logoUrl: "https://framerusercontent.com/images/xRJ6vNo9mUYeVNxt0KITXCXEuSk.png",
      authors: [],
      actions: [sendMessage],
      triggers: [],
    });
    