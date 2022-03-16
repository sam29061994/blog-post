import { render, cleanup, screen } from '@testing-library/react';
import PostListItem, { PostListItemProps } from './PostListItem';
import { convertDateToTimeAgo } from '../../util/date.util';
import { post } from '../../util/test.util';

describe('PostListItemCard', () => {
  const props: PostListItemProps = {
    post,
    isLoading: false,
  };

  beforeAll(() => {
    //Mocking methods which are not implemented in JSDOM
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

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
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(time).toBeVisible();
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
