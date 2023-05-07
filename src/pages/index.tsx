/* eslint-disable indent */
import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { checkCanPutCell, countPiece, placePiece } from 'src/functions/reversi';
import type { SameLength } from 'src/types/common';
import { cellHeightList, cellWidthList, styles } from '../styles/styles.css';

// SECTION 型や定数の基本設定
export const boardSize = 6; // NOTE 2以上の偶数
export const cellSize = 6;
export type playerType = -1 | 1; // NOTE 1:黒, -1:白
const startPlayer: playerType = 1; // NOTE 黒(1)が先手
export type cellType = playerType | 0; // NOTE 1:黒, -1:白, 0:何もなし

export type boardType = SameLength<
  typeof boardSize,
  SameLength<typeof boardSize, cellType>
>; // NOTE boardSize x boardSizeのboard
const initial_board: boardType = Array(boardSize)
  .fill(0)
  .map(() => Array(boardSize).fill(0)) as boardType;
initial_board[boardSize / 2 - 1][boardSize / 2 - 1] = 1;
initial_board[boardSize / 2 - 1][boardSize / 2] = -1;
initial_board[boardSize / 2][boardSize / 2 - 1] = -1;
initial_board[boardSize / 2][boardSize / 2] = 1;

// !SECTION 型や定数の基本設定

// SECTION ページのプログラム
const Home: NextPage = () => {
  // SECTION 準備
  let justifyGameEnd = false;
  const [previousTurnPassed, setPreviousTurnPassed] = useState<boolean>(false);

  const [board, setBoard] = useState<boardType>(initial_board);
  const [turnCount, setTurnCount] = useState<number>(1);
  const [whichPlayerTurn, setWhichPlayerTurn] =
    useState<playerType>(startPlayer);
  const canPut = checkCanPutCell(board, whichPlayerTurn);

  const gameEnd = () => {
    justifyGameEnd = true;
    alert(
      `ゲーム終了: 黒${countPiece(board, 1)}枚 対 白${countPiece(board, -1)}枚`,
    );

    // 盤面を初期化
    setBoard(initial_board);
    setTurnCount(1);
    setWhichPlayerTurn(startPlayer);
  };

  const pass = () => {
    // 連続でパスした場合、ゲーム終了
    if (previousTurnPassed) {
      gameEnd();
    } else {
      setTurnCount(turnCount + 1);
      setWhichPlayerTurn((whichPlayerTurn === 1 ? -1 : 1) as playerType);
      setPreviousTurnPassed(true);
    }
  };

  // !SECTION 準備

  // SECTION ゲーム進行

  // 駒を置く処理
  // REVIEW useMemoを使用する意味はあるか？
  const clickCell = (rowIndex: number, colIndex: number) => {
    setPreviousTurnPassed(false);
    const newBoard = placePiece(rowIndex, colIndex, whichPlayerTurn, board);
    setBoard(newBoard);
    setWhichPlayerTurn((whichPlayerTurn === 1 ? -1 : 1) as playerType);

    if (!justifyGameEnd) {
      if (board.every((row) => row.every((col) => col !== 0))) {
        // 盤面が埋まった場合、ゲーム終了
        justifyGameEnd = true;
      } else {
        // ターン数を更新
        setTurnCount(turnCount + 1);

        // どこにも置けない場合、パス
        if (canPut.length === 0) {
          pass();
        }
      }
    }
  };

  // !SECTION ゲーム進行
  // SECTION 描画処理

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

  // cellの共通className
  // TODO ちゃんとtailwindcssが動くのか確認する
  const cellCommonClassName = clsx(
    `${cellHeightList[cellSize]} ${cellWidthList[cellSize]}`,
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        {board.map((row, rowIndex) => (
          <div
            key={`${row}__${Math.floor(
              Math.random() * Number.MAX_SAFE_INTEGER,
            )}`}
            className={clsx('flex')}
          >
            {row.map((col, colIndex) =>
              canPut.some(
                (v) =>
                  JSON.stringify(v) === JSON.stringify([rowIndex, colIndex]),
              ) ? (
                // 駒が置ける場所の場合
                // styles.canPutでハイライト
                // onclickで駒を置く処理
                <div
                  key={`cell_${rowIndex}-${col}__${Math.floor(
                    Math.random() * Number.MAX_SAFE_INTEGER,
                  )}`}
                  className={`${cellCommonClassName} ${styles.canPut}`}
                  onClick={() => clickCell(rowIndex, colIndex)}
                >
                  {piece(col)}
                </div>
              ) : (
                // 駒が置けない場所の場合
                // そもそもonclickを設定しない
                <div
                  key={`cell_${rowIndex}-${col}__${Math.floor(
                    Math.random() * Number.MAX_SAFE_INTEGER,
                  )}`}
                  className={`${cellCommonClassName} ${styles.cannotPut}`}
                >
                  {piece(col)}
                </div>
              ),
            )}
          </div>
        ))}
        <p>{`${whichPlayerTurn === 1 ? '黒' : '白'}のターンです`}</p>
        <p>{`黒:${countPiece(board, 1)} 白:${countPiece(board, -1)}`}</p>
        <p>{`ターン数:${turnCount}`}</p>
        <button
          type="button"
          onClick={() => pass()}
          className={clsx(
            'rounded-md border-2 border-black bg-slate-200 px-4 py-1',
          )}
        >
          パス
        </button>
      </main>
    </div>
  );
  // !SECTION 描画処理
};
// !SECTION ページのプログラム

// eslint-disable-next-line import/no-default-export
export default Home;
