import React from 'react';
import About from "./About";
import Banner from "./Banner";
import OurProducts from "./OurProducts";
import LatestProduct from "./LatestProduct";
import Slider from "./Slider";
import SmallBanner from './SmallBanner';
import Header from "../Header";
import Footer from "../Footer";
const Home = () => {
    return (
        <>
            {/* <!--wrapper start--> */}
            <div className="wrapper">
                <Header></Header>
                {/* <!--banner--> */}
                <Banner></Banner>

                {/* <!--ABOUT--> */}
                <About></About>

                {/* <!--slider--> */}
                <Slider></Slider>

                {/* <!--Our Products--> */}
                <OurProducts></OurProducts>

                {/* small banner */}

                <SmallBanner></SmallBanner>

                {/* <!--Latest Products--> */}
                <LatestProduct></LatestProduct>
                <Footer></Footer>
            </div>
            {/* <!--wrapper end--> */}

            <a href="#top" id="toTop"></a>
        </>
    )
}

export default Home