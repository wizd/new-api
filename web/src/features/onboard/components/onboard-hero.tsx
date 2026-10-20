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
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

interface OnboardHeroProps {
  aff?: string
  isAuthenticated: boolean
}

export function OnboardHero(props: OnboardHeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-20'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-[0.12]'
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 50% 0%, oklch(0.72 0.14 250 / 70%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 35% at 80% 30%, oklch(0.75 0.12 40 / 45%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      <div className='mx-auto flex max-w-2xl flex-col items-center text-center'>
        <p className='border-border/60 bg-background/80 text-foreground mb-5 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium shadow-xs'>
          {t('Newcomer bonus: ¥10 Token')}
        </p>
        <p className='text-muted-foreground text-sm font-medium tracking-wide'>
          {t('AI Token student offer')}
        </p>
        <h1 className='mt-3 text-4xl leading-tight font-semibold tracking-tight md:text-6xl'>
          {t('Newcomer guide')}
        </h1>
        <p className='text-muted-foreground mt-5 max-w-xl text-base leading-relaxed md:text-lg'>
          {t(
            'Register, join the Token Guild, share a poster, and claim a ¥10 newcomer bonus.'
          )}
        </p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
          {props.isAuthenticated ? (
            <Button size='lg' render={<Link to='/dashboard' />}>
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1.5 size-4' aria-hidden='true' />
            </Button>
          ) : (
            <Button
              size='lg'
              render={
                <Link
                  to='/sign-up'
                  search={props.aff ? { aff: props.aff } : {}}
                />
              }
            >
              {t('Register now')}
              <ArrowRight className='ml-1.5 size-4' aria-hidden='true' />
            </Button>
          )}
          <Button size='lg' variant='outline' render={<Link to='/' />}>
            {t('Back to Home')}
          </Button>
        </div>
      </div>
    </section>
  )
}
