import { useQuery } from 'react-query';

export type PostData = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  authors: [
    {
      name: string;
      id: string;
    }
  ];
  comments: [{ title: string; description: string; id: string }];
};

export const fetchPosts = async () => {
  return await (
    await fetch('https://6144e843411c860017d256f0.mockapi.io/api/v1/posts')
  ).json();
};

const usePosts = () => {
  return useQuery<PostData[]>('posts', fetchPosts);
};

export { usePosts };
