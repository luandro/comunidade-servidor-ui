import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../src/components/layout'

const Home = ({ containers }) => (
  <Layout>
    <h1>Servidor da Comunidade</h1>
    {console.log(containers)}
    {containers 
      ? containers.map(c => <div key={c.Id}>
        <h3>{c.Image} - {c.State} {c.Status}</h3>
      </div>)
      : <h3>Sem containers...</h3>
    }
    <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </Layout>
)

Home.getInitialProps = async ctx => {
  const host = process.browser
    ? window.location.hostname
    : ctx.req.headers.host.split(':')[0]
  const apiUrl = `http://${host}:6661/containers/list`
  
  try {
    const response = await fetch(apiUrl)
    if (response) {
      const res = await response.json()
      return {
        containers: res,
      }
    } else {
      // https://github.com/developit/unfetch#caveats
      return {
        containers: null
      }
    }
  } catch (error) {
    // Implementation or Network error
    return {
      containers: null
    }
  }
}

export default Home
