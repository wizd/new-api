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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

import {
  FRIEND_QR_HEIGHT,
  FRIEND_QR_SRC,
  FRIEND_QR_WIDTH,
  GROUP_QR_HEIGHT,
  GROUP_QR_SRC,
  GROUP_QR_WIDTH,
} from '../constants'

interface OnboardStepsProps {
  aff?: string
  isAuthenticated: boolean
}

export function OnboardSteps(props: OnboardStepsProps) {
  const { t } = useTranslation()

  return (
    <section className='px-6 py-16 md:py-24'>
      <div className='mx-auto max-w-5xl'>
        <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
          {t('How to claim the newcomer bonus')}
        </h2>
        <ol className='mt-8 grid gap-4 md:grid-cols-2'>
          <li className='bg-card flex flex-col gap-4 rounded-3xl border p-6 shadow-xs'>
            <p className='text-muted-foreground text-sm font-medium'>1</p>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold tracking-tight'>
                {t('Create an account')}
              </h3>
              <p className='text-muted-foreground text-sm leading-6'>
                {t(
                  'Register with an email or username. An invite code on this page is carried to registration.'
                )}
              </p>
            </div>
            {props.isAuthenticated ? (
              <Button
                className='mt-auto w-fit'
                variant='outline'
                render={<Link to='/dashboard' />}
              >
                {t('Go to Dashboard')}
              </Button>
            ) : (
              <Button
                className='mt-auto w-fit'
                render={
                  <Link
                    to='/sign-up'
                    search={props.aff ? { aff: props.aff } : {}}
                  />
                }
              >
                {t('Register now')}
              </Button>
            )}
          </li>

          <li className='bg-card flex flex-col gap-4 rounded-3xl border p-6 shadow-xs'>
            <p className='text-muted-foreground text-sm font-medium'>2</p>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold tracking-tight'>
                {t('Add us on WeChat')}
              </h3>
              <p className='text-muted-foreground text-sm leading-6'>
                {t(
                  'Add the operator on WeChat so your newcomer tasks can be confirmed.'
                )}
              </p>
            </div>
            {FRIEND_QR_SRC ? (
              <figure
                className='flex flex-col items-center gap-3'
                aria-label={t('WeChat friend QR code')}
              >
                <div className='w-full max-w-60 overflow-hidden rounded-2xl border bg-white shadow-sm'>
                  <img
                    src={FRIEND_QR_SRC}
                    alt={t('WeChat friend QR code')}
                    width={FRIEND_QR_WIDTH}
                    height={FRIEND_QR_HEIGHT}
                    className='block h-auto w-full'
                    loading='lazy'
                  />
                </div>
              </figure>
            ) : (
              <div
                role='status'
                aria-label={t('QR code coming soon')}
                className='border-border bg-muted/30 flex min-h-60 w-full max-w-60 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 text-center'
              >
                <p className='text-sm font-medium'>
                  {t('QR code coming soon')}
                </p>
                <p className='text-muted-foreground text-xs leading-5'>
                  {t('The WeChat friend QR code will appear here.')}
                </p>
              </div>
            )}
          </li>

          <li className='bg-card flex flex-col gap-4 rounded-3xl border p-6 shadow-xs'>
            <p className='text-muted-foreground text-sm font-medium'>3</p>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold tracking-tight'>
                {t('Join the Token Guild')}
              </h3>
              <p className='text-muted-foreground text-sm leading-6'>
                {t('Scan the WeChat QR code to join the group.')}
              </p>
            </div>
            <figure
              className='flex flex-col items-center gap-3'
              aria-label={t('Token Guild WeChat group QR code')}
            >
              <div className='w-full max-w-60 overflow-hidden rounded-2xl border bg-white shadow-sm'>
                <img
                  src={GROUP_QR_SRC}
                  alt={t('Token Guild WeChat group QR code')}
                  width={GROUP_QR_WIDTH}
                  height={GROUP_QR_HEIGHT}
                  className='block h-auto w-full'
                  loading='lazy'
                />
              </div>
              <figcaption className='text-muted-foreground text-center text-xs leading-5'>
                {t('Valid for 7 days and refreshed regularly.')}
              </figcaption>
            </figure>
          </li>

          <li className='bg-card flex flex-col gap-4 rounded-3xl border p-6 shadow-xs'>
            <p className='text-muted-foreground text-sm font-medium'>4</p>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold tracking-tight'>
                {t('Share the poster and redeem ¥10')}
              </h3>
              <p className='text-muted-foreground text-sm leading-6'>
                {t(
                  'Share the poster to Moments, send the screenshot in the group, and an admin will send a ¥10 redemption code. Redeem it on the Wallet page.'
                )}
              </p>
            </div>
            <Button
              className='mt-auto w-fit'
              variant='outline'
              render={<Link to='/wallet' />}
            >
              {t('Go to Wallet')}
            </Button>
          </li>
        </ol>
      </div>
    </section>
  )
}
