/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'

import { api } from '@/lib/api'

import { Hero } from '../hero'

function renderHero() {
  const root = createRootRoute({ component: Hero })
  const signUp = createRoute({
    getParentRoute: () => root,
    path: '/sign-up',
    component: () => null,
  })
  const pricing = createRoute({
    getParentRoute: () => root,
    path: '/pricing',
    component: () => null,
  })
  const dashboard = createRoute({
    getParentRoute: () => root,
    path: '/dashboard',
    component: () => null,
  })
  const router = createRouter({
    routeTree: root.addChildren([signUp, pricing, dashboard]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  vi.spyOn(api, 'get').mockResolvedValue({
    data: { success: true, data: {} },
  })
})

it('lists goose first among supported apps and links it to the Chinese community', async () => {
  renderHero()

  const apps = (await screen.findByText('Supported Applications')).parentElement
    ?.parentElement
  expect(apps).toBeTruthy()
  const links = within(apps as HTMLElement).getAllByRole('link')

  expect(links[0]).toHaveAccessibleName('goose')
  expect(links[0]).toHaveAttribute('href', 'https://goose.vcorp.ai/zh-Hans/')
  expect(links[0]).toHaveAttribute('target', '_blank')
  expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer')
  expect(links[0].querySelector('img')).toHaveAttribute(
    'src',
    '/goose-logo.svg'
  )
  expect(links[0].querySelector('img')).toHaveClass('dark:invert')

  expect(links[1]).toHaveAccessibleName(/CC Switch/)
  expect(
    links[0].compareDocumentPosition(links[1]) &
      Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy()
  expect(screen.queryByRole('menuitem', { name: 'Cherry Studio' })).toBeNull()
})

it('opens more apps and links Cherry Studio and DeepSeek Harness', async () => {
  renderHero()

  const more = await screen.findByRole('button', { name: 'More Apps' })
  expect(more).toHaveAttribute('aria-expanded', 'false')
  await userEvent.click(more)
  expect(more).toHaveAttribute('aria-expanded', 'true')

  const cherry = screen.getByRole('menuitem', { name: 'Cherry Studio' })
  const harness = screen.getByRole('menuitem', { name: 'DeepSeek Harness' })
  expect(cherry).toHaveAttribute('href', 'https://cherry-ai.com')
  expect(harness).toHaveAttribute('href', 'https://deepseek.com/harness/')
  for (const link of [cherry, harness]) {
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
})
