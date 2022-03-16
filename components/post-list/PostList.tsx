import { useEffect } from 'react';
import { usePosts, PostData } from '../../hooks/usePosts';
import { Empty, List, message } from 'antd';
import PostListItem from '../post/PostListItem';
import { sortByRecentDate } from '../../util/date.util';
import * as CSS from 'csstype';

export type PostListProps = {
  pageSize: number;
};

const paginationStyle: CSS.Properties = {
  textAlign: 'left',
  padding: '10px 0',
};

const PostList = ({ pageSize }: PostListProps) => {
  const { data, isLoading, isError } = usePosts();

  useEffect(() => {
    if (isError) message.error('Error Fetching Posts');
  }, [isError]);

  const sortPosts = (first: PostData, second: PostData) =>
    sortByRecentDate(new Date(first.updatedAt), new Date(second.updatedAt));

  if (!data) return <Empty />;

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        pageSize: pageSize,
        defaultPageSize: 5,
        hideOnSinglePage: true,
        position: 'bottom',
        style: paginationStyle,
      }}
      dataSource={data.sort(sortPosts)}
      renderItem={(item) => (
        <PostListItem key={item.title} post={item} isLoading={isLoading} />
      )}
    />
  );
};

export default PostList;
