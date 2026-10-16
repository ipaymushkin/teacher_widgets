import { Navigate, useParams } from 'react-router-dom'

import { getUtility } from '@/data/utilities-catalog'
import { MealTicketsForm } from '@/features/utilities/meal-tickets-form'

export function UtilityRoute() {
  const { utilityId } = useParams()
  const utility = getUtility(utilityId)

  if (!utility) {
    return <Navigate to="/utilities" replace />
  }

  if (utility.id === 'meal-tickets') {
    return <MealTicketsForm />
  }

  return <Navigate to="/utilities" replace />
}
