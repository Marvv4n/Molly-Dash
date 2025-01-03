// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../resource.mjs";
import * as AssistantsAPI from "./assistants.mjs";
import * as ChatAPI from "./chat/chat.mjs";
import { Assistants, AssistantsPage, } from "./assistants.mjs";
import * as ThreadsAPI from "./threads/threads.mjs";
import { Threads, } from "./threads/threads.mjs";
import * as VectorStoresAPI from "./vector-stores/vector-stores.mjs";
import { VectorStores, VectorStoresPage, } from "./vector-stores/vector-stores.mjs";
import { Chat } from "./chat/chat.mjs";
export class Beta extends APIResource {
    constructor() {
        super(...arguments);
        this.vectorStores = new VectorStoresAPI.VectorStores(this._client);
        this.chat = new ChatAPI.Chat(this._client);
        this.assistants = new AssistantsAPI.Assistants(this._client);
        this.threads = new ThreadsAPI.Threads(this._client);
    }
}
Beta.VectorStores = VectorStores;
Beta.VectorStoresPage = VectorStoresPage;
Beta.Assistants = Assistants;
Beta.AssistantsPage = AssistantsPage;
Beta.Threads = Threads;
//# sourceMappingURL=beta.mjs.map