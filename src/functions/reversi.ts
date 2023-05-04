import type { Dispatch, SetStateAction } from 'react';
import type { boardType, cellType, playerType } from 'src/pages';
import { boardSize } from 'src/pages';

const direction: (-1 | 0 | 1)[] = [-1, 0, 1]; // NOTE -1:左/上, 0:そのまま, 1:右/下
const directionList: [-1 | 0 | 1, -1 | 0 | 1][] = [];
direction.forEach((i) => {
  direction.forEach((j) => {
    if (i === 0 && j === 0) return;
    directionList.push([i, j]);
  });
});

/**
 * @description cellContentに応じてどんなpieceが入っているかを日本語で返す(「空」「白」「黒」)
 */
export const cellContentInJapanese = (
  rowNum: number,
  colNum: number,
  board: boardType,
): string => {
  return board[rowNum][colNum] === 0
    ? '空'
    : board[rowNum][colNum] === 1 // eslint-disable-next-line indent
    ? '黒' // eslint-disable-next-line indent
    : '白';
};

/**
 * @description 指定したcellのpieceを反転させる。pieceがない場合はエラーを返す。
 */
export const reversePiece = (
  rowNum: number,
  colNum: number,
  board: boardType,
  setBoard: Dispatch<SetStateAction<boardType>>,
): void => {
  if (board[rowNum][colNum] === 0) {
    throw new TypeError('cell is empty');
  }
  const new_board = board.map((rowArr) => [...rowArr]) as boardType;
  new_board[rowNum][colNum] = -board[rowNum][colNum] as cellType;

  setBoard(new_board);
};

/**
 * @description 指定したcellに指定されたplayerを返す。
 * @returns [number, number]
 */
export const checkCanPut = (
  board: boardType,
  player: playerType,
): [number, number][] => {
  const canPutList: [number, number][] = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      // NOTE すでにpieceがある場合はスキップ
      if (board[row][col] !== 0) continue;

      directionList.forEach((direction) => {
        const [dr, dc] = direction;
        let r = row + dr;
        let c = col + dc;
        let canFlip = false;
        while (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
          if (board[r][c] === 0) break;
          if (board[r][c] === player * -1) {
            // 相手の石がある場合、石をひっくり返せるかどうかを調べる
            canFlip = true;
          } else if (board[r][c] === player) {
            // 自分の石がある場合、ひっくり返せるマスがある場合のみ、canPutListに追加する
            if (canFlip) canPutList.push([row, col]);
            break;
          }
          r += dr;
          c += dc;
        }
      });
    }
  }
  return canPutList;
};

/**
 * @description 指定したcellが指定されたに中身と合致していた場合、指定されたpieceを置く。中身が指定されていないものだった場合はエラーを返す。
 */
export const putPiece = (
  rowNum: number,
  colNum: number,
  board: boardType,
  setBoard: Dispatch<SetStateAction<boardType>>,
  targetCellContent: cellType,
  playerType: playerType,
): void => {
  if (board[rowNum][colNum] !== targetCellContent) {
    throw new TypeError(
      `[${rowNum},${colNum}] is ${cellContentInJapanese(
        rowNum,
        colNum,
        board,
      )} This cell does not have the designated piece.`,
    );
  }
  const new_board = board.map((rowArr) => [...rowArr]) as boardType;
  new_board[rowNum][colNum] = playerType;
  setBoard(new_board);
};

export const placePiece = (
  row: number,
  col: number,
  player: playerType,
  board: boardType,
  setBoard: Dispatch<SetStateAction<boardType>>,
): void => {
  // 既に石が置かれている場合はエラーを投げる
  if (board[row][col] !== 0) {
    throw new Error('cell is not empty');
  }

  // 新しい盤面を作成する
  const newBoard = board.map((rowArr) => [...rowArr]) as boardType;

  // 置いた場所にプレイヤーの石を置く
  newBoard[row][col] = player;

  // 8方向に対してひっくり返せるかどうかを調べ、ひっくり返す
  for (const [dr, dc] of directionList) {
    let r = row + dr;
    let c = col + dc;
    let canFlip = false;
    const flippedPieces: [number, number][] = [];

    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (newBoard[r][c] === 0) break;
      if (newBoard[r][c] === player * -1) {
        canFlip = true;
        flippedPieces.push([r, c]);
      } else if (newBoard[r][c] === player) {
        if (canFlip) {
          for (const [flipRow, flipCol] of flippedPieces) {
            reversePiece(flipRow, flipCol, newBoard, setBoard);
          }
        }
        break;
      }
      r += dr;
      c += dc;
    }
  }

  setBoard(newBoard);
};
