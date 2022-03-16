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

export const fetchPosts = async (): Promise<PostData[]> => {
  try {
    const response = await fetch(
      'https://6144e843411c860017d256f0.mockapi.io/api/v1/posts'
    );

    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const usePosts = () => {
  const { data, error, isLoading, isError, isSuccess } = useQuery<PostData[]>(
    'posts',
    fetchPosts
  );
  return { data, error, isLoading, isError, isSuccess };
};
