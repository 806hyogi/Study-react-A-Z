import './App.css';
import requests from './api/request';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';
import Footer from './components/Footer';
const App = () => {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row
       title = "NETFLEX ORIGINALS"
       id = "NO"
       fetchUrl={requests.fetchNetflixOriginals}
       isLargeRow
      />

      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" id="TR" fetchUrl={requests.fetchComedyMovies} />
      <Footer />
    </div>
  );
}

export default App;
