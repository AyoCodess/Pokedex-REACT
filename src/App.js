import './App.scss';
import PaginatedItems from './components/PaginatedItems';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <PaginatedItems itemsPerPage={5} />
      <Footer />
    </>
  );
}

export default App;
