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
import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { useAuthStore } from '@/stores/auth-store'

import { OnboardAdvantages } from './components/onboard-advantages'
import { OnboardHero } from './components/onboard-hero'
import { OnboardPoster } from './components/onboard-poster'
import { OnboardSteps } from './components/onboard-steps'

interface OnboardProps {
  aff?: string
}

export function Onboard(props: OnboardProps) {
  const isAuthenticated = !!useAuthStore((state) => state.auth.user)

  return (
    <PublicLayout showMainContainer={false}>
      <main>
        <OnboardHero aff={props.aff} isAuthenticated={isAuthenticated} />
        <OnboardSteps aff={props.aff} isAuthenticated={isAuthenticated} />
        <OnboardAdvantages />
        <OnboardPoster />
      </main>
      <Footer />
    </PublicLayout>
  )
}
