import Button from '@/components/switchModeButton';
import { IAPIResponse } from '@/types/apiResponse';
import { IChampion } from '@/types/champion';
import { Autocomplete, TextField } from '@mui/material';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { SyntheticEvent } from 'react';

const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

const handleOnChange = async (e: SyntheticEvent<Element, Event>, value: string | null) => {
  if (value) {
    const res = await fetch(`${process.env.API_URL}/champion/guess/${value}`);
    const data = await res.json();

    console.log(data);
  }
};

export default function FirstPost(data: IAPIResponse<IChampion[]>) {
  const listHero = data.data;
  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        options={listHero.map((option) => option.name)}
        style={{ padding: '10px' }}
        renderInput={(params) => (
          <TextField {...params} label="Champion" placeholder="Select champion..." />
        )}
        onChange={(e, value) => handleOnChange(e, value)}
      />
      <h2>
        <Link href="/">Back to home</Link>
      </h2>

      <Button />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.API_URL}/champion`);
    const data = await res.json();

    return { props: data };
  } catch (error) {
    console.log(error);
  }
}
