import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../components/Header";
import Product from "../components/Product";

function Search({products}) {
    const router = useRouter();
    const { searchInput } = router.query;

    return (
        <div>
            <Header />


            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
            {
                products.filter(({title}) => {
                    if(searchInput === '') {
                        return title;
                    }
                    else if(title.toLowerCase().includes(searchInput.toLowerCase())) {
                        return title;
                    }
                }).map(({ id, title, price, description, category, image }) => (
                    
                        <Product  
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                        />
                ))
            }
            </div>
           
           
        </div>
    )
}

export default Search;


export async function getServerSideProps(context) {

    const products = await fetch('https://fakestoreapi.com/products')
                            .then((res) => res.json());
  
    return {
      props: {
        products,
      },
    };
  }