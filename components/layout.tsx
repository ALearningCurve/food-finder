import Head from "next/head";
import Header from "./header";

/**
 * Creates the layout of the page with a header and the main content. Also sets the
 * tab name and the favicon.
 * @param children The children to place into the main section of the layout
 * @returns JSX for the layout.
 */
export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div>
      <Head>
        <title>Where to Eat</title>
        <meta name="description" content="Food Finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-blue-500">
        <Header></Header>
      </header>
      <main className="min-h-screen p-3">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
