/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { instance as axiosClient } from '../../network';
import BasicTable from '@/components/Table';
import { useEffect, useState } from 'react';

export default function GuessChampion() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const fetchGameData = async () => {
    setLoading(true);
    const gameData = await axiosClient.get(`/game`);
    if (gameData) {
      setData(gameData.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData().catch((error) => console.log(error));
  }, []);

  const handleStartGame = async () => {
    try {
      await axiosClient.post(`/game`);
      fetchGameData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickContinue = async (gameId: string) => {
    router.push({
      pathname: `guess/${gameId}`,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No game data</p>;

  return (
    <div>
      {data.length > 0 ? (
        <BasicTable data={data} handleClickContinue={handleClickContinue} />
      ) : null}
      <Button onClick={(e) => handleStartGame()}>Create new Game</Button>
      <h1>Guess Champion Index</h1>
    </div>
  );
}
