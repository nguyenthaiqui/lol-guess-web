import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './Table.module.css';
import Image from 'next/image';

interface Game {
  id: string;
  isFinish: boolean;
  guessTime: number;
  username: string;
}

export default function ListGameTable(props: any) {
  const data = props.data;
  const listHeaderField = Object.keys(data[0]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {listHeaderField.map((headerField) => (
              <TableCell key={headerField + '-field'}>{headerField}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Game) => {
            return (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.isFinish.toString()}</TableCell>
                <TableCell align="right">{row.guessTime}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">
                  {row.isFinish ? (
                    <Button disabled>Finish</Button>
                  ) : (
                    <Button onClick={() => props.handleClickContinue(row.id)}>Continue</Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function HistoryGuessTable(props: any) {
  const data = props.data;
  const listHeaderField = data[0].guessResult.map((item: any) => item.name);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key={`${data[0].championGuess.name}-hero-image`}>Hero</TableCell>
            <TableCell key={`${data[0].championGuess.name}-hero`}>Hero Name</TableCell>
            {listHeaderField.map((headerField: string) => (
              <TableCell key={headerField + '-field'}>{headerField}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => {
            return (
              <TableRow key={row.gameId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Image
                    src={row.championGuess.portrait}
                    alt="Landscape picture"
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell>{row.championGuess.name}</TableCell>
                {row.guessResult.map((item: any) => {
                  return (
                    <TableCell
                      key={`${row.gameId}-${Math.random()}`}
                      align="left"
                      className={
                        item.result === 1
                          ? styles.rightAnswer
                          : item.result === 0
                          ? styles.wrongAnswer
                          : styles.closeAnswer
                      }
                    >
                      {item.data.join(', ')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
