/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, cleanup, screen } from '@testing-library/react';
import PostList, { PostListProps } from './PostList';
import * as postModule from '../../hooks/usePosts';
import { post } from '../../util/test.util';

describe('PostListItemCard', () => {
  const props: PostListProps = {
    pageSize: 2,
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

  test('renders post list', () => {
    const spy = jest.spyOn(postModule, 'usePosts').mockImplementation(() => ({
      data: [post],
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
    }));

    render(<PostList {...props} />);
    expect(spy).toBeCalled();
    const title = screen.getByText(post.title);
    const description = screen.getByText(post.description);
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  });

  test('renders No data Component', () => {
    const spy = jest.spyOn(postModule, 'usePosts').mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
    }));

    render(<PostList {...props} />);
    expect(spy).toBeCalled();
    expect(screen.getByText('No Data')).toBeInTheDocument();
  });

  test('renders Error message', () => {
    const spy = jest.spyOn(postModule, 'usePosts').mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: false,
      isError: true,
      isSuccess: false,
    }));

    render(<PostList {...props} />);
    expect(spy).toBeCalled();
    expect(screen.getByText('Error Fetching Posts')).toBeInTheDocument();
  });

  test('pagination works correctly', () => {
    const spy = jest.spyOn(postModule, 'usePosts').mockImplementation(() => ({
      data: [post, { ...post, title: 'title2' }, { ...post, title: 'title3' }],
      error: null,
      isLoading: false,
      isError: true,
      isSuccess: false,
    }));

    const { queryByRole, getByRole, container } = render(
      <PostList {...props} />
    );
    expect(spy).toBeCalled();
    expect(
      container.getElementsByClassName('ant-list-pagination').length
    ).toBeTruthy();
    expect(getByRole('listitem', { name: '2' })).toBeInTheDocument();
    expect(queryByRole('listitem', { name: '3' })).toBeNull();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<PostList {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
