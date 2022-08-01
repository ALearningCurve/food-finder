import Head from 'next/head'
import Header from './header';


export default function Layout({ children, home }: { children: JSX.Element, home: boolean }) {
    return <div>
        <Head>
            <title>Where to Eat</title>
            <meta name="description" content="Food Finder" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className='bg-blue-500'>
            <Header></Header>
        </header>
        <main className='min-h-screen p-3'>
            <div className='container'>
                {children}

            </div>
        </main>
    </div>;
}
