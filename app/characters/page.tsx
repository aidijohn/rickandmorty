/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Card from '@/components/card/Card'
import Filter from '@/components/filter/Filter'
import Footer from '@/components/footer/Footer'
import Loading from '@/components/loading/Loading'
import Search from '@/components/search/Search'
import logo from '@/public/assets/logo.png'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import LocationDetailPage from '@/components/extra_details/LocationDetailPage';

const Pagination = dynamic(() => import('@/components/pagination/Pagination'), {
  ssr: false
})

const page = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [status, setStatus] = useState('')
  const [gender, setGender] = useState('')
  const [species, setSpecies] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchedData, setFetchedData] = useState({
    info: { pages: 0, count: '' },
    results: []
  })
  const [search, setSearch] = useState('')
  const { info, results } = fetchedData

  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`

  useEffect(() => {
    setLoading(true)
    fetch(api)
      .then(res => res.json())
      .then(data => {
        setFetchedData(data)
        setLoading(false)
      })
  }, [api])

  return (
    <main className="h-full">
      <div className="container flex flex-col gap-[1rem]">
        <center><b><h1>Characters List</h1></b></center>

      <div className="container flex gap-12 ml-12">
        {/* Filter By Characters */}
        <Link href="/locations">
          <div className="text-blue-500 underline cursor-pointer"><b>Filter By Locations</b></div>
        </Link>

        {/* Filter By Episodes */}
        <Link href="/episodes">
          <div className="text-blue-500 underline cursor-pointer"><b>Filter By Episodes</b></div>
        </Link>
      </div>

        <div className="flex flex-col gap-[1rem] pb-[2rem]">
          <div className="bg-[#F3F4F6] rounded-lg p-[1rem] flex flex-col justify-between items-center gap-[1rem] sm:flex-row">
            <Search setSearch={setSearch} setPageNumber={setPageNumber} />
            <div className="flex gap-[1rem]">
              {info && info.count ? <>{info.count}</> : '0'} Characters
            </div>
          </div>
          
          <div className="grid gap-[1rem] sm:grid-cols-[.5fr_1.5fr]">
            <div>
              
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="bg-[#F3F4F6] rounded-lg p-[1rem] grid gap-[2rem] max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="m-auto">
                    <Loading />
                  </div>
                ) : (
                  <Card results={results} />
                )}
              </div>
              <Pagination
                info={info}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default page
