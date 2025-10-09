import PublicHeader from '@/components/modules/PublicHeader'
import PublicFooter from '@/components/modules/PublicFooter'

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}