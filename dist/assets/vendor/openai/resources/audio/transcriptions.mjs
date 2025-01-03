// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../resource.mjs";
import * as Core from "../../core.mjs";
export class Transcriptions extends APIResource {
    create(body, options) {
        return this._client.post('/audio/transcriptions', Core.multipartFormRequestOptions({ body, ...options }));
    }
}
//# sourceMappingURL=transcriptions.mjs.map