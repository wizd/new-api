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
import { render, screen } from '@testing-library/react'
import { beforeEach, expect, it, vi } from 'vitest'

import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'

import { Hero } from '../hero'

function renderHero() {
  const root = createRootRoute({
    component: () => <Hero isAuthenticated={false} />,
  })
  const paths = ['/sign-up', '/pricing', '/dashboard', '/onboard']
  const children = paths.map((path) =>
    createRoute({
      getParentRoute: () => root,
      path,
      component: () => null,
    })
  )
  const router = createRouter({
    routeTree: root.addChildren(children),
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
  useAuthStore.getState().auth.reset()
  vi.spyOn(api, 'get').mockResolvedValue({
    data: { success: true, data: {} },
  })
})

it('links the home hero to the newcomer guide', async () => {
  renderHero()

  const link = await screen.findByRole('button', { name: 'Claim ¥10' })
  expect(link).toHaveAttribute('href', '/onboard')
})
