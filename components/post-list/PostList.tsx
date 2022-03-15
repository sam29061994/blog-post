import { PostData } from '../../hooks/usePosts';
import { Empty, List } from 'antd';
import PostListItem from '../post/PostListItem';
import * as CSS from 'csstype';
import styled from 'styled-components';
type PostListProps = {
  data?: PostData[];
  isLoading: boolean;
};

const Wrapper = styled.section`
  margin: 0 auto;
`;

const paginationStyle: CSS.Properties = {
  textAlign: 'left',
  padding: '10px 0',
  position: 'fixed',
  bottom: '90px',
};

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
          style: paginationStyle,
        }}
        dataSource={data}
        renderItem={(item) => <PostListItem key={item.title} post={item} />}
      />
    </Wrapper>
  );
};

export default PostList;
