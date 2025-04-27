import { NextResponse } from "next/server"
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function POST(request) {
 const env = getRequestContext().env
  console.log('Login API called', env)
  const KV = env.MY_KV
  try {
  
    const { email, password } = await request.json()
    
    // Get user from KV
    const user = await KV.get(`user:${email}`)
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const userData = JSON.parse(user)
    
    // Verify password (Note: In production, use hashed password comparison)
    if (userData.password !== password) {
      return NextResponse.json(

        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    return NextResponse.json({ 
      message: 'Login successful',
      user: {
        email: userData.email,
        createdAt: userData.createdAt
      }
    })
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
