import { Button } from '@mui/material';
import { instance as axiosClient } from '../../network';

const { API_URL: url } = process.env;

const handleOnChange = async () => {
  const randomHero = 
  axiosClient.post(`${url}/game`);
};

export default function GuessChampion() {
  return (
    <div>
      <Button onChange={(e) => handleOnChange()}>Start</Button>
      <h1>Guess Champion Index</h1>
    </div>
  );
}
