//to create brand new next.js project go to terminal: npx create-next-app projectname
//to run: npm run dev
import Layout from '../components/layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
//mongo db is working fine need to update git n vercel