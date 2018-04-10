import * as fetch from 'got';

class OutroAPI {
  public static authToken: string = null;
  public static baseURL: string = null;

  public static initialize(authToken: string) {
    this.authToken = authToken;
  }

  public static setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
  }

  public static async post(endpoint: string, payload: any): Promise<any> {
    if (!endpoint) {
      throw new Error('No endpoint specified.');
    }
    try {
      const response = await fetch(this.baseURL + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify(payload),
        method: 'POST'
      });
      debugger;
      return JSON.parse(response.body);
    }
    catch (e) {
      throw new Error(`post to ${endpoint} failed: ${e.message}`)
    }
  }

  // A POST method that takes form data rather than an object
  // Form data doesnt get JSON.stringified
  public static async form(endpoint: string, payload: FormData): Promise<any> {
    if (!endpoint) {
      throw new Error('No endpoint specified.');
    }
    try {
      const response = await fetch(this.baseURL + endpoint, {
        headers: {
          Authorization: `Bearer ${this.authToken}`
        },
        form: true,
        body: payload,
        method: 'POST'
      });

      return JSON.parse(response.body);
    }
    catch (e) {
      throw new Error(`form to ${endpoint} failed: ${e.message}`)
    }
  }

  public static async get(endpoint: string): Promise<any> {
    if (!endpoint) {
      throw new Error('No endpoint specified.');
    }
    try {
      const response = await fetch(this.baseURL + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        method: 'GET'
      });

      return JSON.parse(response.body);
    }
    catch (e) {
      throw new Error(`get from ${endpoint} failed: ${e.message}`)
    }
  }
}

export default OutroAPI;
