import * as nodeFetch from 'node-fetch';

const IS_BROWSER = typeof(window) !== 'undefined' ? true : false;
let request: any;

if (!IS_BROWSER) {
  request = nodeFetch;
} else {
  request = fetch;
}

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
      const response = await request(this.baseURL + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        mode: 'cors',
        body: JSON.stringify(payload),
        method: 'POST'
      });

      return await response.json();
    }
    catch (e) {
      throw new Error(`post to ${endpoint} failed: ${e.message}`);
    }
  }

  // A POST method that takes form data rather than an object
  // Form data doesnt get JSON.stringified
  public static async form(endpoint: string, payload: FormData): Promise<any> {
    if (!endpoint) {
      throw new Error('No endpoint specified.');
    }
    try {
      const response = await request(this.baseURL + endpoint, {
        headers: {
          Authorization: `Bearer ${this.authToken}`
        },
        mode: 'cors',
        body: payload,
        method: 'POST'
      });

      return await response.json();
    }
    catch (e) {
      throw new Error(`form to ${endpoint} failed: ${e.message}`);
    }
  }

  public static async upload(endpoint: string, payload: FormData, onProgress: (percent: number) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!endpoint) {
        throw new Error('No endpoint specified');
      }

      try {
        const req = new XMLHttpRequest();

        req.upload.addEventListener('progress', (e: ProgressEvent) => {
          const percent = e.loaded / e.total * 100;
          onProgress(percent);
        });

        req.addEventListener('load', () => {
          resolve(JSON.parse(req.response));
        });

        req.open('POST', this.baseURL + endpoint);
        req.setRequestHeader('Authorization', `Bearer ${this.authToken}`);
        req.send(payload);
      }

      catch (err) {
        reject(err);
      }
    });
  }

  public static async get(endpoint: string): Promise<any> {
    if (!endpoint) {
      throw new Error('No endpoint specified.');
    }
    try {
      const response = await request(this.baseURL + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        mode: 'cors',
        method: 'GET'
      });

      return await response.json();
    }
    catch (e) {
      throw new Error(`get from ${endpoint} failed: ${e.message}`);
    }
  }
}

export default OutroAPI;
