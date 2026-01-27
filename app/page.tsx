'use client';

import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import PostCard from './components/PostCard';
import WriteButton from './components/WriteButton';
import WriteModal from './components/WriteModal';
import { supabase } from './lib/supabase';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  date: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#2C241D]">
      <Navigation />
      
      {/* 컨테이너 상단 여백을 조절해서 사진이 더 위로 오게 만들었습니다. */}
      <div className="max-w-screen-xl mx-auto px-6 pt-10 pb-20">
        
        {loading ? (
          <div className="text-center py-40 opacity-50 italic text-sm tracking-widest uppercase">
            Loading your moods...
          </div>
        ) : (
          /* 그리드가 이제 페이지 최상단에서 시작합니다. */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {posts.map((post) => (
              <PostCard 
                key={post.id}
                title={post.title}
                content={post.content}
                imageUrl={post.image_url}
                date={post.date}
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