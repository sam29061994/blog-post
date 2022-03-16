import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { PostData, fetchPosts } from '../hooks/usePosts';
import PostList from '../components/post-list/PostList';

import { dehydrate, QueryClient } from 'react-query';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="Coding Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">Blog App</Link>
        </h1>
        <PostList pageSize={5} />
      </main>
    </div>
  );
};
export default Home;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<PostData[]>('posts', fetchPosts);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};
