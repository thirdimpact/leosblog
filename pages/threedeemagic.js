import dynamic from 'next/dynamic'

const Threedeemagic = dynamic(() => import('../components/Threedeemagic'), {
  ssr: false,
})

export default function ThreedeemagicPage() {
  return <Threedeemagic />
}
