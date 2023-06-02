/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { instance as axiosClient } from '../../network';
import { Autocomplete, Button, TextField } from '@mui/material';
import { IAPIResponse } from '@/types/apiResponse';
import { IChampion } from '@/types/champion';
import { SyntheticEvent } from 'react';
import Link from 'next/link';

function gameDetail(data: IAPIResponse<IChampion[]>) {
  const listHero = data.data;

  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({ id: '', isFinish: false, username: 'will', guessTime: 0 });
  const [championName, setChampionName] = useState('');
  const [isFinish, setIsFinish] = useState(false);

  const router = useRouter();

  const fetchGameData = async () => {
    setLoading(true);
    const gameId = router.query.gameId;

    const gameData = await axiosClient.get(`/game/${gameId}`);
    if (gameData) {
      setGame(gameData.data.data);
      setIsFinish(gameData.data.data.isFinish);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchGameData();
  }, [router.isReady]);

  const handleOnChange = async (e: SyntheticEvent<Element, Event>, value: string | null) => {
    if (value) {
      setChampionName(value);
    }
  };

  const handleSubmit = async () => {
    const res = await axiosClient.post(`${process.env.API_URL}/game/guessChampion`, {
      gameId: router.query.gameId,
      championName: championName,
    });

    if (!res.data.data.isFinish) {
      fetchGameData();
    } else {
      setIsFinish(true);
    }
  };

  if (!game) return <h1>No game not found</h1>;

  return (
    <div>
      {isFinish ? <h1>Game Finished</h1> : null}
      <h1>Total guess: {game.guessTime}</h1>
      <Autocomplete
        id="free-solo-demo"
        options={listHero.map((option) => option.name)}
        style={{ padding: '10px' }}
        renderInput={(params) => (
          <TextField {...params} label="Champion" placeholder="Select champion..." />
        )}
        onChange={(e, value) => handleOnChange(e, value)}
        disabled={isFinish}
      />
      <Button onClick={handleSubmit} disabled={isFinish}>
        Submit
      </Button>

      <h2>
        <Link href="/guess">Back</Link>
      </h2>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    console.log(`${process.env.API_URL}/champion`);
    const res = await axiosClient.get(`${process.env.API_URL}/champion`);
    const data = res.data;

    return { props: data };
  } catch (error: any) {
    throw new Error(error, { cause: error });
  }
}

export default gameDetail;
