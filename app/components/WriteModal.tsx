'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase'; // 아까 만든 열쇠 가져오기

export default function WriteModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!title || !file) return alert('제목과 사진은 필수입니다!');
    setLoading(true);

    try {
      // 1. 사진을 'images' 창고(Storage)에 업로드
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // 2. 업로드된 사진의 '공개 주소' 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      // 3. 'posts' 장부(Table)에 글 정보 저장하기
      const { error: tableError } = await supabase
        .from('posts')
        .insert([{ 
          title, 
          content, 
          image_url: publicUrl,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }]);

      if (tableError) throw tableError;

      alert('당신의 무드가 기록되었습니다.');
      onClose(); // 창 닫기
      window.location.reload(); // 새 글 확인을 위해 새로고침
    } catch (error) {
      console.error(error);
      alert('기록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2C241D]/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-[#F8F6F1] p-10 rounded-sm shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 italic text-[#2C241D]">New Journal Entry.</h2>
        
        <div className="space-y-6 font-sans">
          <input 
            type="text" 
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent border-b border-[#2C241D]/10 w-full outline-none text-xl p-2" 
          />
          
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-xs text-stone-500"
          />

          <textarea 
            rows={5} 
            placeholder="Write your story..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-transparent border border-[#2C241D]/10 w-full outline-none p-4 text-base leading-relaxed resize-none"
          ></textarea>
          
          <div className="flex justify-end gap-4 mt-8">
            <button onClick={onClose} className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100">Cancel</button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="bg-[#2C241D] text-[#EFEBE2] px-8 py-3 text-xs uppercase tracking-widest hover:opacity-90 transition disabled:opacity-30"
            >
              {loading ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}