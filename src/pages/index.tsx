import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import type { SameLength } from 'src/types/common';
import { cellHeightList, cellWidthList } from './styles.css';

export const boardSize = 8;
export type playerType = -1 | 1; // NOTE 1:黒, -1:白
export type cellType = playerType | 0; // NOTE 1:黒, -1:白, 0:何もなし

export type boardType = SameLength<
  typeof boardSize,
  SameLength<typeof boardSize, cellType>
>; // NOTE boardSize x boardSizeのboard
export const initial_board: boardType = Array(boardSize)
  .fill(0)
  .map(() => Array(boardSize).fill(0)) as boardType;

const Home: NextPage = () => {
  const [board, setBoard] = useState<boardType>(initial_board);
  const [whichPlayerTurn, setWhichPlayerTurn] = useState<playerType>(1);
  // NOTE 黒(1)が先手

  const cellSize = 6;

  /**
   * @description boardのcellContentに応じてpieceを返す
   */
  const piece = (cellContent: cellType): JSX.Element => {
    if (cellContent === 0) {
      return <></>;
    } else if (cellContent === -1) {
      return (
        <div
          className={clsx(
            `${cellHeightList[cellSize - 1]} ${
              cellWidthList[cellSize - 1]
            } rounded-full bg-slate-50`,
          )}
        />
      );
    } else if (cellContent === 1) {
      return (
        <div
          className={clsx(
            `${cellHeightList[cellSize - 1]} ${
              cellWidthList[cellSize - 1]
            } rounded-full bg-slate-800`,
          )}
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {board.map((row) => (
          <div key={`${row}`} className={clsx('flex')}>
            {row.map((cell) => (
              <div
                key={`${row}-${cell}`}
                className={clsx(
                  `${cellHeightList[cellSize]} ${cellWidthList[cellSize]} flex items-center justify-center border border-gray-600 bg-green-500`,
                )}
                // onClick={}
              >
                {piece(cell)}
              </div>
            ))}
          </div>
        ))}
        a
      </main>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
