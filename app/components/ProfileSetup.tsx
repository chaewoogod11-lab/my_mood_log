import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ProfileSetup({ session }: { session: any }) {
  const [nickname, setNickname] = useState('')

  const updateProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: session.user.id, nickname })
    
    if (error) alert('이미 있는 닉네임이거나 에러가 발생했어요!')
    else alert('프로필 설정 완료! 이제 광장으로 갑니다.')
  }

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">당신의 SNS 닉네임을 정해주세요!</h2>
      <input 
        type="text" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)}
        className="border p-2 w-full mb-4 rounded-lg"
        placeholder="멋진 닉네임..."
      />
      <button 
        onClick={updateProfile}
        className="bg-black text-white w-full py-2 rounded-lg font-bold"
      >
        시작하기
      </button>
    </div>
  )
}