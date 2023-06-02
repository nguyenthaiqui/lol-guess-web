import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

interface Game {
  id: string;
  isFinish: boolean;
  guessTime: number;
  username: string;
}

export default function BasicTable(props: any) {
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
