"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class API {
    static initialize(authToken) {
        this.authToken = authToken;
    }
    static setBaseURL(baseURL) {
        this.baseURL = baseURL;
    }
    static post(endpoint, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!endpoint) {
                throw new Error('No endpoint specified.');
            }
            try {
                const response = yield fetch(this.baseURL + endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.authToken}`
                    },
                    mode: 'cors',
                    body: JSON.stringify(payload),
                    method: 'POST'
                });
                return yield response.json();
            }
            catch (e) {
                throw new Error(`post to ${endpoint} failed: ${e.message}`);
            }
        });
    }
    // A POST method that takes form data rather than an object
    // Form data doesnt get JSON.stringified
    static form(endpoint, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!endpoint) {
                throw new Error('No endpoint specified.');
            }
            try {
                const response = yield fetch(this.baseURL + endpoint, {
                    headers: {
                        Authorization: `Bearer ${this.authToken}`
                    },
                    mode: 'cors',
                    body: payload,
                    method: 'POST'
                });
                return yield response.json();
            }
            catch (e) {
                throw new Error(`form to ${endpoint} failed: ${e.message}`);
            }
        });
    }
    static get(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!endpoint) {
                throw new Error('No endpoint specified.');
            }
            try {
                const response = yield fetch(this.baseURL + endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.authToken}`
                    },
                    mode: 'cors',
                    method: 'GET'
                });
                return yield response.json();
            }
            catch (e) {
                throw new Error(`get from ${endpoint} failed: ${e.message}`);
            }
        });
    }
}
API.authToken = null;
API.baseURL = null;
exports.default = API;
