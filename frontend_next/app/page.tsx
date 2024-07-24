import Navigation from "@/components/Navigation";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <p className="text-white font-semibold text-5xl">
                  Koperasi <br /> Mitra Sejahtera
                </p>
                <p className="mt-4 text-lg text-zinc-400">
                  Koperasi Mitra Sejahtera adalah sebuah Lembaga
                  keuangan mikro yang memberikan pinjaman kredit
                  kepada masyarakat RW 12 Mojoroto yang menjadi anggotanya.
                  Kantor yang digunakan untuk rapat anggota Koperasi
                  bertepat pada Jl. Suparjan Mangunwijaya.
                </p>
              </div>
              <Navigation />
            </div>

          </div>
        </div>

        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
          style={{ transform: "translateZ(0)" }}
        >

          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <section className="pb-20 bg-blue-300 -mt-24">
        <div className="container mx-auto px-4">

          <div className="flex flex-wrap items-center mt-24">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-user-friends text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold">
                Koperasi Simpan Pinjam
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Koperasi Simpan Pinjam merupakan suatu lembaga pembiayaan. Dikatakan
                sebagai lembaga pembiayaan karena kegiatan yang dilakukan KSP adalah
                menghimpun dana dari para anggotanya yang kemudian disalurkan kembali dana
                tersebut kepada para anggotanya atau masyarakat umum

              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                Dimana dalam
                menjalankan kegiatannya koperasi simpan pinjam memungut sejumlah uang dari
                setiap anggota koperasi.
              </p>
              <Link href="/" passHref>
                <button className="font-bold text-blueGray-700 mt-8">
                  Koperasi Mitra Sejahtera
                </button>
              </Link>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-20">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1590650046871-92c887180603?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Top Notch Services
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
