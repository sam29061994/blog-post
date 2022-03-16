import { render, cleanup, screen } from '@testing-library/react';
import PostListItem, { PostListItemProps } from './PostListItem';
import { convertDateToTimeAgo } from '../../util/date.util';
import { post } from '../../util/test.util';

describe('PostListItemCard', () => {
  const props: PostListItemProps = {
    post,
    isLoading: false,
  };

  afterEach(() => {
    cleanup();
  });

  test('loads and displays postItem correctly', () => {
    render(<PostListItem {...props} />);
    const title = screen.getByText(props.post.title);
    const description = screen.getByText(props.post.description);
    const time = screen.getByText(
      convertDateToTimeAgo(new Date(props.post.updatedAt))
    );
    const image = screen.getByAltText('Author Image');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(time).toBeVisible();
    expect(image).toBeVisible();
  });

  test('loads placeholder skeloton during loading', () => {
    const updatedProps = { ...props, isLoading: true };
    const { container } = render(<PostListItem {...updatedProps} />);
    expect(
      container.getElementsByClassName('ant-skeleton').length
    ).toBeTruthy();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<PostListItem {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
