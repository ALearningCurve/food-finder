import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import LocationSearch from '../components/search/locationSearch'
import { useEffect, useState } from 'react'
import QueryData from '../interfaces/QueryData'
import LocationResults from '../components/search/locationResults'
import { Location } from '../interfaces/Location'
import Toggle from '../components/toggle'



const Home: NextPage = () => {
  const [queryData, setQueryData] = useState<QueryData>();

  return (
    <Layout home>
      <div className='container'>
        <div className='mb-5 border-b-4 pb-5'>
          <p>Can&apos;t decide what to eat? Let us choose for you! Using your location we will automatically find restaurants 
            near you and then present them in a random order so you don&apos;t have to decide! You can change the search settings in the form below!</p>
        </div>

        <div className='mb-5 border-b-4 pb-5'>
          <h1 className='text-2xl leading-loose font-extrabold'>Search Options</h1>
          <p className='text-grey-800'>Change your location and the food preferences used in the search.</p>
          <Toggle visable={!queryData} name="Search Options">
            {/* <div className="flex flex-col items-center justify-center"> */}
            <LocationSearch callback={(_: QueryData) => setQueryData(_)} instantSearch></LocationSearch>
            {/* </div> */}
          </Toggle>
        </div>

        {queryData &&
            <LocationResults queryData={queryData}></LocationResults>
        }
      </div>
    </Layout>
  )
}

export default Home



