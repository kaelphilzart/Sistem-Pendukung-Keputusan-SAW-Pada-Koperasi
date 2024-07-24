
import './styles.css'

export default function registerlayout({
    children,
}: {
    children: React.ReactNode; 
}) {
  return (
    <>
   <main>
        <section className="relative w-full h-full py-10 min-h-screen bg-slate-800">
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/images/register_bg_2.png')",
            }}
          ></div>
          {children}
        </section>
      </main>
    </>

  )
}
