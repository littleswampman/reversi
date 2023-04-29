import type { NextComponentType, NextPageContext } from 'next';
import type { FC, ReactNode } from 'react';

import '../styles/globals.css';

type Props<P = Record<string, unknown>> = {
  Component: NextComponentType<NextPageContext, unknown, P>;
  pageProps: ReactNode;
};

const MyApp: FC<Props> = ({ Component, pageProps }) => (
  <Component>{pageProps}</Component>
);

// eslint-disable-next-line import/no-default-export
export default MyApp;
