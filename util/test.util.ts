import { PostData } from '../hooks/usePosts';
export const post: PostData = {
  title: 'title1',
  description: 'description1',
  createdAt: '2021-05-20T01:13:07.861Z',
  updatedAt: '2021-05-20T01:13:07.861Z',
  id: '1',
  authors: [
    {
      name: 'sam',
      id: '1',
    },
  ],
  comments: [
    {
      title: 'comments1',
      description: 'description1',
      id: '1',
    },
  ],
} as PostData;
