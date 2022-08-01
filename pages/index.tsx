import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import LocationSearch from '../components/locationSearch'
const Home: NextPage = () => {
  return (
    <Layout home>
      <div>
        <h3>Where to Eat?</h3>
        <p>Fill out this form to find out</p>
        <LocationSearch callback={() => null}></LocationSearch>
      </div>
    </Layout>
  )
}

export default Home
