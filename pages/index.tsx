import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import LocationSearch from '../components/locationSearch'
import { useEffect, useState } from 'react'
import QueryData from '../interfaces/QueryData'
import LocationResults from '../components/locationResults'
import { Location } from '../interfaces/Location'
import Toggle from '../components/toggle'



const Home: NextPage = () => {
  const [queryData, setQueryData] = useState<QueryData>();

  return (
    <Layout home>
      <div>
        <div className='mb-5'>

          <h1 className='text-2xl leading-loose font-extrabold'>Where to Eat?</h1>
          <p className='text-grey-800'>Fill out this form to find out</p>
        </div>
        <Toggle visable={!queryData} name="Search Options">
          {/* <div className="flex flex-col items-center justify-center"> */}
          <LocationSearch callback={(_: QueryData) => setQueryData(_)}></LocationSearch>
          {queryData &&
            <>
              <hr className='border-t-8 bg-black w-12 h-1' />
              <LocationResults queryData={queryData}></LocationResults>
            </>
          }
          {/* </div> */}
        </Toggle>
      </div>
    </Layout>
  )
}

export default Home



