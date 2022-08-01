import Head from 'next/head'
import Header from './header';


export default function Layout({ children, home }: { children: JSX.Element, home: boolean }) {
    return <div className="container">
        <Head>
            <title>Where to Eat</title>
            <meta name="description" content="Food Finder" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className='bg-blue-500'>
            <Header></Header>
        </header>
        <main className='min-h-screen p-3'>
            {children}
        </main>
    </div>;
}
