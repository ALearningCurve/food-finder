import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout home>
      <h1>Hello World</h1>
    </Layout>
  )
}

export default Home
