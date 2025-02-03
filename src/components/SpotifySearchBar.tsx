'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Input } from '@/components/shadcn/Input';
import { Card } from '@/components/shadcn/Card';
import Loading from './fallback/Loading';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/Avatar';
import Image from 'next/image';
//import { getSpotifySongsBySearch } from "@/services/spotifyService";

const SpotifySearchBar = () => {
  const [search, setSearch] = useState('');

  const {
    data: searchSongs,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['searchUsers', search],
    //queryFn: () => getSpotifySongsBySearch(search),
    enabled: false,
    retry: 1,
  });

  useEffect(() => {
    const queryDelay = setTimeout(() => {
      if (search !== '') {
        refetch();
      }
    }, 1000);

    return () => clearTimeout(queryDelay);
  }, [search]);

  return (
    <div className="w-full">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔎︎ Search"
      ></Input>
      {search !== '' && (
        <Card
          className="w-full flex flex-col justify-center gap-3 
      top-12 max-h-[800px] absolute 
      z-10 p-4 overflow-y-scroll overflow-auto rounded-2xl"
        >
          {searchSongs?.length > 0 ? (
            searchSongs?.map((song, index) => (
              <Card
                key={index}
                onClick={() => setSearch('')}
                className="p-4 flex items-center gap-3 cursor-pointer"
              >
                <Image
                  className="w-[50px] h-[50px] rounded"
                  src={song.albumArt}
                  alt=""
                />
                <span>
                  {song.artist} - {song.name}
                </span>
              </Card>
            ))
          ) : searchSongs?.length === 0 ? (
            'No Songs Found'
          ) : isError ? (
            <p>{error.message}</p>
          ) : (
            <div className="h-24 flex justify-center items-center">
              <Loading />
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SpotifySearchBar;
