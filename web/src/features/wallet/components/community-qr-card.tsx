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
import { useTranslation } from 'react-i18next'

import { IconWeChat } from '@/assets/brand-icons'
import { TitledCard } from '@/components/ui/titled-card'

const COMMUNITY_QR_SRC = '/group-join.png'

export function CommunityQrCard() {
  const { t } = useTranslation()

  return (
    <TitledCard
      title={t('Join the Community')}
      description={t(
        'Scan the WeChat QR code to join the community. You can discuss any questions there.'
      )}
      icon={<IconWeChat className='h-4 w-4' />}
      iconTone='success'
      disableHoverEffect
    >
      <figure
        className='flex flex-col items-center gap-3'
        aria-label={t('WeChat community group QR code')}
      >
        <div className='w-full max-w-60 overflow-hidden rounded-2xl border bg-black shadow-sm'>
          <img
            src={COMMUNITY_QR_SRC}
            alt={t('WeChat community group QR code')}
            width={450}
            height={680}
            className='block h-auto w-full'
          />
        </div>
        <figcaption className='text-muted-foreground text-center text-xs leading-5'>
          {t('All questions are welcome in the community discussion.')}
        </figcaption>
      </figure>
    </TitledCard>
  )
}
