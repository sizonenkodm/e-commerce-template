import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getRequest } from 'utils/axios_utils';
import useLocalStorage from 'hooks/useLocalStorage';
import MainView from 'pages/MainVeiw';
import CartView from 'pages/CartView';
import FormView from 'pages/FormView';

export const Context = createContext(null);

function App() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [cardForUpdate, setCardForUpdate] = useState({});
  const [upd, setUpd] = useState(false);
  const [page, setPage] = useLocalStorage('page', 1);
  const [sort, setSort] = useLocalStorage('sort', '');
  const [search, setSearch] = useLocalStorage('search', '');
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    getRequest('products', page, sort, search)
      .then(response => {
        setProducts(response.data);
        setPageQty(Math.ceil(response.headers["x-total-count"] / 10));
      });
  }, [upd, page, sort, search]);

  useEffect(() => {
    getRequest('cart')
      .then(response => setOrder(response.data));
  }, [upd]);

  useEffect(() => {
    localStorage.setItem('page', page);
    localStorage.setItem('sort', sort);
    localStorage.setItem('search', search);
  }, [page, sort, search])


  return (
    <Context.Provider value={{
      products,
      setProducts,
      order,
      setOrder,
      cardForUpdate,
      setCardForUpdate,
      upd,
      setUpd,
      sort,
      setSort,
    }}>
      <Routes>
        <Route path='/' element={<MainView search={search} setSearch={setSearch} page={page} setPage={setPage} pageQty={pageQty} />} />
        <Route path='/cart' element={<CartView />} />
        <Route path='/form' element={<FormView />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
