import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const WebCrawler = ({ url }) => {
  const [products, setProducts] = useState([]);
  const [productDescriptions, setProductDescriptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(url,{timeout:90000});
        const $ = cheerio.load(response.data);

       
        const products = [];
        $('.product, .item').each((index, element) => {
          const productName = $(element).find('.product-name, .item-name, .productname').text();
          const productLink = new URL($(element).find('.product-link, .prodname, .a').attr('href'), url).href;
          products.push({ name: productName, link: productLink });
        });

        
   

        

        setProducts(products);
      
      } catch (error) {
        console.error('Błąd:', error.message);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div>
      <h2>Produkty na stronie:</h2>
      <ul className="product-list">
        {products.map((product, index) => (
          <li key={index} className="product-item">
            <strong>Nazwa:</strong> {product.name}, <strong>Link:{product.link}</strong> {productDescriptions[product.name]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebCrawler;