export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

export type LoginState = {
    status: LoginStatus;
}