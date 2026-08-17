import MainApp from '@/components/Portfolio';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  // Read posts server-side (fs) and pass metadata to the client app.
  const posts = getAllPosts().map(({ content, ...meta }) => meta);
  return <MainApp posts={posts} />;
}
