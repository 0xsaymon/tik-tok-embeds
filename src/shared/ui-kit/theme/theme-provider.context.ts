import { createContext } from 'react';

import type { ThemeProviderState } from './theme-provider.model';

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export default ThemeProviderContext;
