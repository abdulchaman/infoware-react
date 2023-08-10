import React, { useState, useMemo, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';

const Search = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    const authToken = useMemo(() => {
        return sessionStorage.getItem('ltk')
    }, []);


    const handleProduct = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <div className="search_proo" key={item.id}>
                        <div className="srch_pic_box">
                            <img src={item.image} alt={item.name} />
                            <span><a href="#">Call For Enquiry</a></span>
                        </div>
                        <div className="srch_dtls_box">
                            <a href="#">{item.name}</a>
                            <p>Rs.40.00</p>
                        </div>
                    </div>)
            })
        }
    }

    const displayCategory = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <option value={item.id} key={item.id}>{item.name}</option>
                )
            })
        }
    }

    const handleCategoryChange = (event) => {
        const selectedCategoryId = parseInt(event.target.value);
        const selectedCat = categories.find(cat => cat.id === selectedCategoryId);
        setSelectedCategory(selectedCat);
    };

    const handleSearchInputChange = (event) => {
        const keyword = event.target.value;
        // console.log(keyword)
        setSearchKeyword(keyword);
        const filtered = categories.filter((category) => {
            return (category.name.toLowerCase().includes(keyword.toLowerCase()))
        })

        setFilteredCategories(filtered);
    };
    
    const handleSelectedCategory = (selectedCategory) => {
        if (selectedCategory) {
            return selectedCategory.sub_categories.map((subcategory) => {
                return (
                    <li key={subcategory.id}>
                        <label className="contect_container_checkBox">{subcategory.name}
                            <input type="checkbox" name="text" />
                            <span className="contect_checkmark"></span>
                        </label>
                    </li>
                )
            }
            )
        }
    }
    useEffect(() => {
        fetch('https://phpwebdevelopmentservices.com/project-react-backend/api/common-data', {
            headers: {
                'accept': 'application/json',
                'X-CSRF-TOKEN': authToken,
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then(result => {
                let categories = result.result.categories;
                console.log(categories);
                setCategories(categories);
                setSelectedCategory(categories[0]);
                setFilteredCategories(categories);
            })
    }, [])
    return (
        <>
            <div className='wrapper'>
                <Header></Header>
                <div className="search_main_section">
                    <div className="container">
                        <div className="row res_padd">

                            <div className="bread_crumb">
                                <a href="#">Home</a>
                                <span><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                                <a href="#">Vegetables</a>
                            </div>

                            <div className="mobile_filter"> <i className="fa fa-filter" aria-hidden="true"></i><p>Show Filter</p></div>
                            {/* left */}
                            <div className="laft_search_panel">
                                <h3>Filter Options</h3>

                                <div className="form_group" style={{ position: "relative" }}>
                                    <input
                                        placeholder="Keyword"
                                        type="text"
                                        className="search-input"
                                        value={searchKeyword}
                                        onChange={handleSearchInputChange}
                                    />
                                    <img src="assets/images/icon36.png" className="search_icon" />
                                </div>
                                <div className="form_group">
                                    <label className="search_label">Category</label>
                                    <select className="slectt" onChange={handleCategoryChange}>
                                        {displayCategory(categories)}
                                    </select>
                                </div>
                                <div className="form_group">
                                    <label className="search_label">Sub Category</label>
                                    <ul className="c_ul">
                                        {handleSelectedCategory(selectedCategory)}
                                    </ul>
                                </div>
                                <div className="form_group">
                                    <label className="search_label">Price Range</label>
                                    <div className="slider_rnge">
                                        <div id="slider-range" className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
                                            <div className="ui-slider-range ui-widget-header ui-corner-all" style={{ left: 0, width: "100%" }}></div>
                                            <span tabindex="0" className="ui-slider-handle ui-state-default ui-corner-all" style={{ left: 0 }}></span>
                                            <span tabindex="0" className="ui-slider-handle ui-state-default ui-corner-all" style={{ left: "100%" }}></span>
                                        </div>
                                        <span className="range-text">
                                            <input type="text" className="price_numb" readonly id="amount" />
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" className="search-submit1">Filter</button>
                            </div>

                            {/* right */}
                            <div className="right_search_panel">

                                <div className="evnt_shot_by_main">
                                    <label className="event-sort">Showing 1-20 out of 100 product for Vegetable</label>
                                    <div className="sort-filter">
                                        <p>Sort by :</p>
                                        <select className="sort-select">
                                            <option>Select</option>
                                            <option>Price - Low to High</option>
                                            <option>Price - High to Low </option>
                                        </select>
                                    </div>
                                </div>
                                {/* display products */}
                                {handleProduct(filteredCategories)}
                                <div className="w-100"></div>
                                <div className="pagination_area">
                                    <ul>
                                        <li><a href="#"><i className="fa fa-angle-left" aria-hidden="true"></i> </a></li>
                                        <li><a href="#">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li className="active"><a href="#">3</a></li>
                                        <li><a href="#">4</a></li>
                                        <li><a href="#">...</a></li>
                                        <li><a href="#">25</a></li>
                                        <li><a href="#"> <i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer></Footer>
            </div>

        </>
    )
}

export default Search;