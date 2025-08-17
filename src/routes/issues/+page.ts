import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export const load: PageLoad = async ({ url }) => {
  const modules = import.meta.glob('$lib/content/issues/*.md', { eager: true });
  const posts: Post[] = [];

  // Extract categories from query parameters
  const categoriesParam = url.searchParams.get('categories');
  const selectedCategories = categoriesParam
    ? categoriesParam.split(',').map(c => c.trim())
    : [];

  for (const path in modules) {
    const mod = modules[path] as { metadata: Post };
    if (mod?.metadata?.published) {
      posts.push({
        ...mod.metadata,
        slug: path.split('/').pop()?.replace('.md', '') || '',
        categories: mod.metadata.categories ?? [] // fallback to empty array
      });
    }
  }

  // Filter posts by selected categories if any
  const filteredPosts = selectedCategories.length
    ? posts.filter(post => post.categories.some(category => selectedCategories.includes(category)))
    : posts;

  return {
    posts: filteredPosts,
    selectedCategories
  };
};
