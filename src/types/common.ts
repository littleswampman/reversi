type TypeRec<Num, Elm, T extends unknown[], C extends unknown[]> = C extends {
  length: Num;
}
  ? T
  : TypeRec<Num, Elm, [Elm, ...T], [unknown, ...C]>;

/**
 * @description 型TをN個以上持つ配列を作成する
 * @date 4/30/2023 - 9:37:02 PM
 *
 * @export
 * @typedef {AtLeast}
 * @template N
 * @template T
 */
export type AtLeast<N extends number, T> = TypeRec<N, T, T[], []>;

/**
 * @description 型TをN個丁度持つ配列を作成する
 * @date 4/30/2023 - 9:37:10 PM
 *
 * @export
 * @typedef {SameLength}
 * @template N
 * @template T
 */
export type SameLength<N extends number, T> = TypeRec<N, T, [], []>;
