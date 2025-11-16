'use client'
import React from 'react'
import GoogleSignin from '../../components/ui/login'
export default function Login() {
  const handleGoogleSignIn = async () => {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/auth/googleAuth`;
  } catch (error: any) {
    console.log({ error: error.message });
  }
};

  return (
    <div className='w-full h-screen'>
    <GoogleSignin
      handleLogin={handleGoogleSignIn}
      />
    </div>
  )
}
