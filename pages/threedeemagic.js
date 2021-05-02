import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Threedeemagic = dynamic(() => import('../components/Threedeemagic'), {
  ssr: false,
})

export default function ThreedeemagicPage() {
  return <Threedeemagic />
}
