export type RegisterStatus = 'pending' | 'creating' | 'success' | 'error'

export type RegisterState = {
    status: RegisterStatus
}