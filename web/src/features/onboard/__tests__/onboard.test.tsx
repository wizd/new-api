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

import { Onboard } from '../index'

function renderOnboard(aff?: string) {
  const root = createRootRoute({
    component: () => <Onboard aff={aff} />,
  })
  const paths = [
    '/',
    '/onboard',
    '/sign-up',
    '/sign-in',
    '/dashboard',
    '/wallet',
    '/pricing',
    '/rankings',
    '/about',
    '/docs',
  ]
  const children = paths.map((path) =>
    createRoute({
      getParentRoute: () => root,
      path,
      component: () => null,
    })
  )
  const router = createRouter({
    routeTree: root.addChildren(children),
    history: createMemoryHistory({
      initialEntries: [
        aff ? `/onboard?aff=${encodeURIComponent(aff)}` : '/onboard',
      ],
    }),
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
  vi.spyOn(api, 'get').mockImplementation(async (url) => {
    if (String(url).includes('/api/notice')) {
      return { data: { success: true, data: '' } }
    }
    return { data: { success: true, data: {} } }
  })
})

it('carries the invite code into every register link', async () => {
  renderOnboard('a&b')

  const links = await screen.findAllByRole('button', { name: 'Register now' })
  expect(links.length).toBeGreaterThan(0)
  for (const link of links) {
    const href = link.getAttribute('href') ?? ''
    const url = new URL(href, 'http://localhost')
    expect(url.pathname).toBe('/sign-up')
    expect(url.searchParams.get('aff')).toBe('a&b')
  }
})

it('links back home and shows the group QR code and poster', async () => {
  renderOnboard()

  const home = await screen.findByRole('button', { name: 'Back to Home' })
  expect(home).toHaveAttribute('href', '/')

  const groupQr = screen.getByRole('img', {
    name: 'Token Guild WeChat group QR code',
  })
  expect(groupQr).toHaveAttribute('src', '/加群二维码.jpg')
  expect(groupQr).toHaveAttribute('width', '1044')
  expect(groupQr).toHaveAttribute('height', '1560')

  const poster = screen.getByRole('img', {
    name: 'AI Token student offer poster',
  })
  expect(poster).toHaveAttribute('src', '/海报-学校.jpg')
  expect(poster).toHaveAttribute('width', '864')
  expect(poster).toHaveAttribute('height', '1152')
  expect(poster).toHaveAttribute('loading', 'lazy')

  const download = screen.getByRole('button', { name: 'Download poster' })
  expect(download).toHaveAttribute('href', '/海报-学校.jpg')
})

it('shows a placeholder when the WeChat friend QR code is not configured', async () => {
  renderOnboard()

  expect(
    await screen.findByRole('status', { name: 'QR code coming soon' })
  ).toBeVisible()
  expect(
    screen.queryByRole('img', { name: 'WeChat friend QR code' })
  ).toBeNull()
})
