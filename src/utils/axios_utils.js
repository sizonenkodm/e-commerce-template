import axios from 'axios';

const productsRequest = axios.create({
    baseURL: 'http://localhost:3001/products/',
    headers: {
        'Content-type': 'application/json',
    }
});

const cartRequest = axios.create({
    baseURL: 'http://localhost:3001/cart/',
    headers: {
        'Content-type': 'application/json',
    }
});

export const getRequest = (apiData, page = 1, sort = '', search = '') => {
    if (apiData === 'products') {
        if (sort && search) {
            return productsRequest.get(`?_page=${page}&_sort=${sort.split(' ')[0]}&_order=${sort.split(' ')[1]}&title_like=${search}`);
        } else if (sort) {
            return productsRequest.get(`?_page=${page}&_sort=${sort.split(' ')[0]}&_order=${sort.split(' ')[1]}`);
        } else if (search) {
            return productsRequest.get(`?_page=${page}&title_like=${search}`);
        } else {
            return productsRequest.get(`?_page=${page}`);
        }
    }

    if (apiData === 'cart') return cartRequest.get();
}

export const createRequest = (apiData, item) => {
    if (apiData === 'products') return productsRequest.post('/', JSON.stringify(item));
    if (apiData === 'cart') return cartRequest.post('/', JSON.stringify(item));
}

export const updateRequest = (apiData, item) => {
    if (apiData === 'products') return productsRequest.patch(`/${item.id}`, JSON.stringify(item));
    if (apiData === 'cart') return cartRequest.patch(`/${item.id}`, JSON.stringify(item));
}

export const deleteRequest = (apiData, id) => {
    if (apiData === 'products') return productsRequest.delete(`/${id}`);
    if (apiData === 'cart') return cartRequest.delete(`/${id}`);
}