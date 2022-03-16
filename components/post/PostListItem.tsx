import { PostData } from '../../hooks/usePosts';
import Image from 'next/image';
import { List, Space, Tooltip, Skeleton } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { truncateString } from '../../util/string.util';
import { convertDateToTimeAgo } from '../../util/date.util';
import { TooltipPlacement } from 'antd/lib/tooltip';
import styled from 'styled-components';

const IconText = ({
  Icon,
  text,
  tooltipTitle,
  tooltipPlacement,
}: {
  Icon: typeof MessageOutlined;
  text: string;
  tooltipTitle?: string;
  tooltipPlacement?: TooltipPlacement;
}) => {
  return (
    <Space>
      {tooltipTitle ? (
        <Tooltip title={tooltipTitle} placement={tooltipPlacement ?? 'top'}>
          <Icon style={{ marginRight: '10px' }} />
          {text}
        </Tooltip>
      ) : (
        <>
          <Icon />
          {text}
        </>
      )}
    </Space>
  );
};

const Wrapper = styled(List.Item)`
  padding: 10px 0;
`;
export type PostListItemProps = {
  post: PostData;
  isLoading: boolean;
};
const PostListItem = ({ post, isLoading }: PostListItemProps) => {
  return (
    <Wrapper
      actions={[
        <IconText
          Icon={UserOutlined}
          text={String(post.authors.length)}
          key="authors"
          tooltipTitle="authors"
          tooltipPlacement="left"
        />,
        <IconText
          Icon={MessageOutlined}
          text={String(post.comments.length)}
          key="comments"
          tooltipTitle="comments"
          tooltipPlacement="right"
        />,
      ]}
    >
      <Skeleton loading={isLoading} active avatar>
        <List.Item.Meta
          // Post Api Image Source Not Responding
          avatar={
            <Image
              src="https://joeschmoe.io/api/v1/random"
              alt="Author Image"
              height="40px"
              width="40px"
            />
          }
          title={<a href={post.title}>{post.title}</a>}
          description={convertDateToTimeAgo(new Date(post.updatedAt))}
        />
      </Skeleton>
      {truncateString(post.description, 100)}
    </Wrapper>
  );
};

export default PostListItem;
