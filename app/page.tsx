import logo from '@/public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-[#2779A7]">
      <div className="grid h-screen relative">
        <div className="relative bg-gray-500 row-start-1 col-start-1 row-end-2 col-end-2 overflow-hidden">
          <Link href="/locations">
            <div className="absolute w-full h-full bg-[url('/assets/locations.jpg')] bg-cover grayscale brightness-50 cursor-pointer hover:grayscale-0 hover:scale-[1.25] transition-[.6s] duration-[.6s]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-[1] text-[24px] font-bold">
              Click To See Locations
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
