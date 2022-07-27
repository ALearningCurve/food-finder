import Head from 'next/head'
import Header from './header';


export default function Layout({ children, home }: { children: JSX.Element, home: boolean }) {
    return <div className="container">
        <Head>
            <title>Quizlet Clone</title>
            <meta name="description" content="Quizlet Clone" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className='bg-blue-500'>
            <Header></Header>
        </header>
        <main className='bg-slate-900 min-h-screen'>
            {children}
        </main>
    </div>;
}
