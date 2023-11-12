import { Account, Client } from 'appwrite';

const client = new Client();

client.setEndpoint('http://localhost/v1').setProject('654d4ae39026ccc3c404');

export const account = new Account(client);
export { ID } from 'appwrite';
