export const getAllProductsQuery = {
    data: `{
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              onlineStoreUrl
              priceRange{
                maxVariantPrice{
                  amount
                  currencyCode
                }
                
              }
              slug: handle
              seo {
                description
                title
              }
              images(first: 1) {
                edges {
                  node {
                    id
                    altText
                    url
                  }
                }
              }
            }
          }
        }
      }
      `,
};

export const singleProduct = (slug) => {
    return {
        data: `{
          product(handle: "${slug}") {
              id
              title
              description
              totalInventory
              images(first: 1){
                edges {
                  node {
                    src
                    altText
                  }
                }
  
              }
              slug: handle
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              
                
              }
          }
       
      }`,
    };
};

export const singleProductWithGID = (id) => {
    return {
        data: `{
          product (id: "${id}") {
            id
            title
            description
            totalInventory
            images(first: 1){
              edges {
                node {
                  src
                  altText
                }
              }

            }
            slug: handle
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            
              
            }
           
          
      
            }
     
    }`,
    };
};