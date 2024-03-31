import React, {useEffect, useState} from 'react';
import {fetchBeers, processData} from './services/PunkAPIService';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import Footer from "./components/Footer";
import Header from "./components/Header"

export default function App() {
    const [beers, setBeers] = useState([]);
    const [page, setPage] = useState(1); // Track the current page
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [noMoreResult, setNoMoreResult] = useState(false);
    const [noResultFound, setNoResultFound] = useState(false);

    useEffect(() => {
        const getBeers = async () => {
            setLoading(true);
            let apiBeers = (await fetchBeers()).data;
            apiBeers = processData(apiBeers);
            setBeers(apiBeers);
            setLoading(false);
        };
        getBeers();
    }, []);

    const handleSearch = async (searchQuery) => {
        setPage(1);
        await setSearchQuery(searchQuery);
        let data = (await fetchBeers(searchQuery)).data;
        if (data.length === 0) setNoResultFound(true);
        else {
            setNoResultFound(false);
            data = processData(data);
        }
        setBeers(data);
    };
    const loadMoreData = async () => {
        setLoading(true);
        let apiBeers = (await fetchBeers(searchQuery, page + 1)).data;
        if (apiBeers.length === 0) setNoMoreResult(true);
        apiBeers = processData(apiBeers);
        await setBeers((prevBeers) => [...prevBeers, ...apiBeers]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
    };

    return (
        <div className="App">
            <Header/>
            <SearchBar onSearch={handleSearch}/>
            <div className="beer-container">
                <div className="beer-container-inner">
                    {!noResultFound && beers.map((beer) => (
                        <ProductCard key={beer.id} data={beer}/>
                    ))}

                </div>
                {noResultFound &&
                    <div className="no-result-found">No result for {searchQuery}. Please try another query.</div>}
            </div>
            {!noResultFound && <div className="load-more-container">
                {!noMoreResult && <button className="load-more-button" onClick={loadMoreData}
                                          disabled={loading}>{!loading ? 'Load More Beers!' : 'Loading...'}</button>}
                {noMoreResult && <p>No more beers.</p>}
            </div>}
            <Footer/>
        </div>
    );
}
