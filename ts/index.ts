class API {
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
    const response = await fetch(this.baseURL + endpoint, {
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

  // A POST method that takes form data rather than an object
  // Form data doesnt get JSON.stringified
  public static async form(endpoint: string, payload: FormData): Promise<any> {
    if (!endpoint) {
      throw new Error('No endpoint specified.');
    }
    const response = await fetch(this.baseURL + endpoint, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      },
      mode: 'cors',
      body: payload,
      method: 'POST'
    });

    return await response.json();
  }

  public static async get(endpoint: string): Promise<any> {
    if (!endpoint) {
      throw new Error('No endpoint specified.');
    }
    const response = await fetch(this.baseURL + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      },
      mode: 'cors',
      method: 'GET'
    });

    return await response.json();
  }
}

export default API;
