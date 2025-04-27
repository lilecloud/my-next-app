import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextResponse } from "next/server"


export const runtime = 'edge'

export async function POST(request) {
   const KV = getRequestContext().env.MY_KV
  try {
    const { email, password } = await request.json()
    
    // Check if user already exists
    const existingUser = await KV.get(`user:${email}`)
    if (existingUser) {
      return new NextResponse(JSON.stringify({ 
        message: 'User already exists' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Store user in KV
    let a = await KV.put(`user:${email}`, JSON.stringify({
      email,
      password, // Note: In production, you should hash the password
      createdAt: new Date().toISOString()
    }))

    console.log('User stored in KV:', a)

    return new NextResponse(JSON.stringify({ 
      message: 'Registration successful' 
    }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ 
      message: 'Internal server error' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
