import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@components/layout/Layout/Layout';
import SuperheroList from '@components/superhero/SuperheroList/SuperheroList';
import SuperheroDetails from '@components/superhero/SuperheroDetails/SuperheroDetails';
import SuperheroForm from '@components/superhero/SuperheroForm/SuperheroForm';
import '@styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<SuperheroList />} />
            <Route path="/superhero/:id" element={<SuperheroDetails />} />
            <Route path="/create" element={<SuperheroForm />} />
            <Route path="/edit/:id" element={<SuperheroForm />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
