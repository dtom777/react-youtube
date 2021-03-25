import React, { useEffect, useContext } from 'react';
import { fetchPopularData } from '../apis/index';
import Layout from '../components/Layout/Layout';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import VideoGridItem from '../components/VideoGridItem/VideoGridItem';
import { Store } from '../store/index';

const Top = () => {
  const { globalState, setGlobalState } = useContext(Store);
  useEffect(() => {
    fetchPopularData().then((res) => {
      console.log('data', res);
      setGlobalState({
        type: 'SET_POPULAR',
        payload: { popular: res.data.items },
      });
    });
  }, []);
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular &&
          globalState.popular.map((popular) => {
            return (
              <VideoGridItem
                id={popular.id}
                key={popular.id}
                src={popular.snippet.thumbnails.standard.url}
                title={popular.snippet.title}
              />
            );
          })}
      </VideoGrid>
      top page
    </Layout>
  );
};

export default Top;
