import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return(
  <div>
  <Head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  </Head>
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo center">Logo</a>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav>
  <main>
    <section>
      <h1>Job CARDS</h1>
    </section>
    <section>
      <h1>Writing</h1>
    </section>
  </main>
  </div>)
}
