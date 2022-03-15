import { PostData } from '../../hooks/usePosts';
import { Empty, List } from 'antd';
import PostListItem from '../post/PostListItem';
import styled from 'styled-components';
type PostListProps = {
  data?: PostData[];
  isLoading: boolean;
};

const Wrapper = styled.section`
  margin: 0 auto;
`;

const PostList = ({ data }: PostListProps) => {
  if (!data) return <Empty />;
  return (
    <Wrapper>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 5,
          defaultPageSize: 5,
          hideOnSinglePage: true,
          position: 'bottom',
          style: {
            textAlign: 'left',
            padding: '10px 0',
            position: 'fixed',
            bottom: '90px',
          },
        }}
        dataSource={data}
        renderItem={(item) => <PostListItem key={item.title} post={item} />}
      />
    </Wrapper>
  );
};

export default PostList;
