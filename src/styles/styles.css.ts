import { keyframes, style } from '@vanilla-extract/css';

const ping = keyframes({
  '50%': {
    backgroundColor: 'green',
  },
  '75%': {
    // transform: 'scale(1.1)',
    backgroundColor: 'greenyellow',
  },
  '100%': {
    // transform: 'scale(1.1)',
    backgroundColor: 'green',
  },
});

const cell = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid gray',
});

export const styles = {
  canPut: style([
    cell,
    {
      animationName: ping,
      animationDuration: '1s',
      backgroundColor: 'greenyellow',
    },
  ]),
  cannotPut: style([
    cell,
    {
      backgroundColor: 'green',
    },
  ]),
};

export const cellHeightList = [
  'h-4',
  'h-6',
  'h-8',
  'h-10',
  'h-12',
  'h-14',
  'h-16',
  'h-18',
];
export const cellWidthList = [
  'w-4',
  'w-6',
  'w-8',
  'w-10',
  'w-12',
  'w-14',
  'w-16',
  'w-18',
];
