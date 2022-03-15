import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { PostData, fetchPosts, usePosts } from '../hooks/usePosts';
import PostList from '../components/post-list/PostList';

import { dehydrate, QueryClient } from 'react-query';
import { sortByRecentDate } from '../util/date.util';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { data, isLoading } = usePosts();

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="Coding Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="https://nextjs.org">Blog App</Link>
        </h1>
        <PostList
          data={data?.sort((first, second) =>
            sortByRecentDate(
              new Date(first.updatedAt),
              new Date(second.updatedAt)
            )
          )}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};
export default Home;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<PostData>('posts', fetchPosts);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};
