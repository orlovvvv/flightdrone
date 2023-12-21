export type RegisterStatus = 'pending' | 'authenticating' | 'success' | 'error';

export type RegisterState = {
    status: RegisterStatus;
}