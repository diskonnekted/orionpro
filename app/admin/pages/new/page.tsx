import PostForm from '@/components/admin/PostForm';
import { createPage } from '../actions';

export default function NewPage() {
  return (
    <PostForm 
      categories={[]} 
      action={createPage} 
      backLink="/admin/pages"
      pageTitle="Add New Page"
    />
  );
}
