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
import { Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

import { POSTER_HEIGHT, POSTER_SRC, POSTER_WIDTH } from '../constants'

export function OnboardPoster() {
  const { t } = useTranslation()

  return (
    <section className='px-6 pt-4 pb-24 md:pb-32'>
      <div className='mx-auto flex max-w-xl flex-col items-center text-center'>
        <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
          {t('Share this poster')}
        </h2>
        <p className='text-muted-foreground mt-3 text-sm leading-6'>
          {t('Press and hold to save the poster, then share it to Moments.')}
        </p>
        <figure className='mt-8 w-full max-w-sm'>
          <img
            src={POSTER_SRC}
            alt={t('AI Token student offer poster')}
            width={POSTER_WIDTH}
            height={POSTER_HEIGHT}
            loading='lazy'
            className='border-border/60 block h-auto w-full rounded-3xl border shadow-sm'
          />
        </figure>
        <Button
          className='mt-6'
          variant='outline'
          render={<a href={POSTER_SRC} download='' />}
        >
          <Download aria-hidden='true' />
          {t('Download poster')}
        </Button>
      </div>
    </section>
  )
}
