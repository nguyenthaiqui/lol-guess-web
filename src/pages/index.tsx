import { IChampion } from '@/types/champion';
import Link from 'next/link';

export default function Home(data: IChampion) {
  return (
    <div>
      <h1 className="title">
        Read <Link href="/champ">this page!</Link>
      </h1>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const URL = 'http://localhost:3000';
    const res = await fetch(`${URL}/champion/random`);
    const data = await res.json();

    return { props: data };
  } catch (error) {
    console.log(error);
  }
}
