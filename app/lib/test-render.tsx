import { MemoryRouter } from 'react-router';
import { render as vitestRender } from 'vitest-browser-react'

import "~/app.css";

export const render = (component: React.ReactNode) =>
  vitestRender(component);

export const renderWithRouter = (component: React.ReactNode) =>
  vitestRender(component, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });