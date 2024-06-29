import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Detalhes.css";

function Detalhes() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <img src={product.image_link} alt={product.name} />
      <p>Marca: {product.brand}</p>
      <p>Valor: {product.price}</p>
      <p className="description">{product.description}</p>
      <p>Categoria: {product.category}</p>
      <p>Tipo de Produto: {product.product_type}</p>
    </div>
  );
}

export default Detalhes;
