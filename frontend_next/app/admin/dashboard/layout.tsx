
import './styles.css'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode; 
}) {
  return (
    <>
   <main>
        <section className="">  

          {children}
        </section>
      </main>
    </>

  )
}
