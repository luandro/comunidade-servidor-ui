import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../src/components/layout'

const Home = ({ containers }) => (
  <Layout>
    <h1>Servidor da Comunidade</h1>
    {console.log(containers)}
    {containers.map(c => <div key={c.Id}>
      <h3>{c.Image} - {c.State} {c.Status}</h3>
    </div>)}
    <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </Layout>
)

Home.getInitialProps = async ctx => {
  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}:6661/containers/list`
    : `${protocol}://${ctx.req.headers.host}:6661/containers/list`

  try {
    const response = await fetch(apiUrl)
    if (response.ok) {
      const res = await response.json()
      return {
        containers: res
      }
    } else {
      // https://github.com/developit/unfetch#caveats
      return {
        success: false
      }
    }
  } catch (error) {
    // Implementation or Network error
    return {
      success: false,
      gotCaught: error,
    }
  }
}

export default Home
