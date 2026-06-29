'use client'

import { useEffect } from 'react'
import clarity from '@microsoft/clarity'

export default function ClarityProvider() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    if (id) clarity.init(id)
  }, [])
  return null
}
