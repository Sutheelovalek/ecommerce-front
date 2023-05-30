import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { Category } from "@/models/Category";
import Product from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        font-size: 1.5em;
    }
`;

const FilterWrapper = styled.div`
    display: flex;
    gap: 10 px;
`;

const Filter = styled.div`
    display: flex;
    background-color: #ddd;
    padding: 5px 10px;
    border-radius: 5px;
    gap: 5px;
    margin: 5px;
    color: #444;
    select {
        background-color: transparent;
        border: 0;
        font-size: inherit;
        color: #444;
    }
`;
export default function CategoryPage({ 
  category,subCategories, 
  products: originalProducts }) 
  {
    const [products, setProducts] = useState(originalProducts);
    const [filterValues, setFilterValues] = useState(
        category.properties.map(p => ({name: p.name, value:'all'}))   
    );
    const [sort, setSort] = useState('_id-desc');
function handlerFilterChange(filterName, filterValue) {
    setFilterValues(prev => {
        return prev.map(p => ({
            name: p.name, 
            value: p.name === filterName ? filterValue : p.value,}));
    });
}
useEffect(() => {
    const catIds = [category._id, ...(subCategories.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set('categories', catIds.join(','));
    params.set('sort', sort);
    filterValues.forEach((f) => {
      if (f.value !== 'all') {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?` + params.toString();
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, [category._id, subCategories, filterValues, sort]);

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
        <h1>{category.name}</h1>
        <FilterWrapper>
        {category.properties.map((prop) => (
          <Filter key={prop.name}>
            <span>{prop.name}:</span>
            <select
            onChange={ev => handlerFilterChange(prop.name, ev.target.value)}
            value={filterValues.find(f => f.name === prop.name).value}
            >
                <option value='all'>All</option>
              {prop.values.map((val) => (
                <option value={val} key={val}>
                  {val}
                </option>
              ))}
            </select>
          </Filter>
        ))}
          <Filter>
            <span>Sort:</span>
            <select 
            value={sort} 
            onChange={ev => setSort(ev.target.value)}>
              <option value='price-asc'>price, lowest first</option>
              <option value='price-desc'>price, highest first</option>
              <option value='_id-desc'>newest first</option>
              <option value='_id-asc'>oldest first</option>
            </select>
          </Filter>
        </FilterWrapper>
        </CategoryHeader>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id }) || [];
  const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
  const products = await Product.find({ category: catIds });


  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
