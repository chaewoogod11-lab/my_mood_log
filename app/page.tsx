'use client';

import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import PostCard from './components/PostCard';
import WriteButton from './components/WriteButton';
import WriteModal from './components/WriteModal';
import { supabase } from './lib/supabase';

// 데이터 모양을 정확히 정의합니다.
interface PostWithProfile {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  profiles: {
    nickname: string;
  } | null;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 바구니 타입을 PostWithProfile로 일치시켰습니다.
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    // profiles에서 nickname을 가져오는 쿼리입니다.
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id, 
        title, 
        content, 
        image_url, 
        created_at,
        profiles ( nickname )
      `)
      .order('created_at', { ascending: false });

    if (data) {
      setPosts(data as any);
    }
    if (error) console.error("데이터 로딩 실패:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#2C241D]">
      <Navigation />
      
      <div className="max-w-screen-xl mx-auto px-6 pt-10 pb-20">
        {loading ? (
          <div className="text-center py-40 opacity-50 italic text-sm tracking-widest uppercase">
            Loading your moods...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {posts.map((post) => (
              <PostCard 
                key={post.id}
                // nickname을 PostCard에 확실히 던져줍니다.
                nickname={post.profiles?.nickname || '익명'}
                title={post.title}
                content={post.content}
                imageUrl={post.image_url}
                // date 대신 created_at을 넘겨줍니다.
                date={post.created_at}
              />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-[#2C241D]/10">
            <p className="opacity-50 font-light">아직 기록된 무드가 없습니다.</p>
          </div>
        )}
      </div>

      <WriteButton onClick={() => setIsModalOpen(true)} />
      <WriteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}