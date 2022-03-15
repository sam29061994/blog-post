import { PostData } from '../../hooks/usePosts';
import { List, Avatar, Space, Tooltip } from 'antd';
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
  const StyledIcon = styled(Icon)`
    margin-right: 10px;
  `;
  return (
    <Space>
      {tooltipTitle ? (
        <Tooltip title={tooltipTitle} placement={tooltipPlacement ?? 'top'}>
          <StyledIcon />
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

const PostListItem = ({ post }: { post: PostData }) => {
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
      <List.Item.Meta
        // Post Api Image Source Not Responding
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={<a href={post.title}>{post.title}</a>}
        description={convertDateToTimeAgo(new Date(post.updatedAt))}
      />
      {truncateString(post.description, 100)}
    </Wrapper>
  );
};

export default PostListItem;
