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
import {
  BadgeCheck,
  BadgePercent,
  Gauge,
  GraduationCap,
  Receipt,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

export function OnboardAdvantages() {
  const { t } = useTranslation()

  const advantages = [
    {
      title: t('Stable and available'),
      desc: t(
        'Requests stay available through a monitored gateway with multiple upstreams.'
      ),
      icon: <Gauge className='size-4' aria-hidden='true' />,
    },
    {
      title: t('Official models, never watered down'),
      desc: t(
        'You get the official models, not a substituted or diluted endpoint.'
      ),
      icon: <BadgeCheck className='size-4' aria-hidden='true' />,
    },
    {
      title: t('As low as 10% of the list price'),
      desc: t(
        'Claude from 20% of the list price. OpenAI and Gemini from 10% of the list price.'
      ),
      icon: <BadgePercent className='size-4' aria-hidden='true' />,
    },
    {
      title: t('Transparent pay-as-you-go'),
      desc: t(
        'You pay only for what you use, and prices are shown before you spend.'
      ),
      icon: <Receipt className='size-4' aria-hidden='true' />,
    },
    {
      title: t('Built for study and work'),
      desc: t(
        'Write papers, write code, and finish assignments with the same account.'
      ),
      icon: <GraduationCap className='size-4' aria-hidden='true' />,
    },
  ]

  return (
    <section className='px-6 py-16 md:py-24'>
      <div className='mx-auto max-w-5xl'>
        <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
          {t('Why this relay')}
        </h2>
        <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {advantages.map((item) => (
            <AnimateInView
              key={item.title}
              className='bg-card rounded-3xl border p-6 shadow-xs'
            >
              <div className='bg-muted text-foreground mb-4 flex size-9 items-center justify-center rounded-full'>
                {item.icon}
              </div>
              <h3 className='text-base font-semibold tracking-tight'>
                {item.title}
              </h3>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {item.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
