import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProdutosList.css";

function ProdutosList() {
  const [produtos, setProdutos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProdutos(currentPage);
  }, [currentPage]);

  const fetchProdutos = async (page) => {
    try {
      const response = await axios.get(
        `http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`
      );
      if (response.data && response.data.length > 0) {
        setProdutos(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
        setLoading(false);
      } else {
        setProdutos([]);
        setTotalPages(0);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleProdutoClick = (produtoId) => {
    navigate(`/produtos/${produtoId}`);
  };

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return produtos.slice(startIndex, endIndex);
  };

  return (
    <div className="produtos-container">
      <h2 className="produtos-title">Lista de Produtos</h2>
      <div className="produtos-list">
        {loading ? (
          <div>Loading...</div>
        ) : produtos.length > 0 ? (
          getPaginatedProducts().map((produto) => (
            <div
              key={produto.id}
              className="produto-card"
              onClick={() => handleProdutoClick(produto.id)}
            >
              <img
                src={produto.image_link}
                alt={produto.name}
                className="produto-image"
              />
              <h3 className="produto-name">{produto.name}</h3>
              <p className="produto-info">Preço: R$ {produto.price}</p>
              <p className="produto-info">Categoria: {produto.category}</p>
            </div>
          ))
        ) : (
          <div className="produtos-empty">Nenhum produto encontrado.</div>
        )}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-text">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ProdutosList;
