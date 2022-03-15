import { PostData } from '../../hooks/usePosts';
import { Empty, List } from 'antd';
import PostListItem from '../post/PostListItem';
import styles from './PostList.module.css';

type PostListProps = {
  data?: PostData[];
  isLoading: boolean;
};

const PostList = ({ data }: PostListProps) => {
  if (!data) return <Empty />;
  return (
    <section className={styles.section}>
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
    </section>
  );
};

export default PostList;
