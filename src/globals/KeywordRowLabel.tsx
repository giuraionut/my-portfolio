'use client'
import { useRowLabel } from '@payloadcms/ui'

export const KeywordRowLabel = () => {
  const { data } = useRowLabel<{ keyword?: string }>()
  return data?.keyword || 'New Keyword'
}
