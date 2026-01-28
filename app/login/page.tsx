'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase' // 아까 고친 그 '다리' 파일입니다!
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 1. 회원가입 기능: 새로운 유저를 등록합니다.
  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert('회원가입 에러: ' + error.message)
    } else {
      alert('회원가입 성공! 이제 로그인 버튼을 눌러주세요.')
    }
    setLoading(false)
  }

  // 2. 로그인 기능: 기존 유저인지 확인하고 입장시킵니다.
  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert('로그인 에러: ' + error.message)
    } else {
      alert('로그인 성공!')
      router.push('/') // 메인 페이지(타임라인)로 이동!
      router.refresh() // 상태 반영을 위해 새로고침
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-black text-center tracking-tighter">MY MOOD SNS</h1>
        <p className="text-center text-gray-500 text-sm">함께 무드를 나누는 공간</p>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="이메일 주소" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none transition-all"
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full py-4 font-bold text-white bg-black rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:bg-gray-400"
          >
            {loading ? '처리 중...' : '로그인'}
          </button>
          <button 
            onClick={handleSignUp} 
            disabled={loading}
            className="w-full py-4 font-bold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 active:scale-95 transition-all"
          >
            신규 회원가입
          </button>
        </div>
      </div>
    </div>
  )
}