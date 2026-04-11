import { useState, useTransition } from "react";
import Product from "./Product";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "./fetcher";

export default function Products() {
    const { data: products } = useSuspenseQuery({
        queryKey: ["products-list"],
        queryFn: () => get("products-list"),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const [, startTransition] = useTransition();
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    function handleSearchChange(event) {
        const searchQuery = event.target.value.trim().toLowerCase();
        setQuery(searchQuery);
        startTransition(() => {
            setFilteredProducts(
                products.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery)
                )
            );
        });
    }

    function handleReset() {
        setQuery("");
        setFilteredProducts(products);
    }

    return (
        <>
            <div className="products-title">
                <h1>Produse</h1>
                <title>Produse | SuperM</title>
                <input
                    type="search"
                    className="search"
                    value={query}
                    placeholder="Cautare produse"
                    onChange={handleSearchChange}
                />
            </div>
            {filteredProducts.length === 0 ? (
                <div className="products-not-found">
                    <div>
                        <h2>Nu s-au găsit produse!</h2>
                        <p>
                            Căutarea dvs. &quot;<strong>{query}</strong>&quot; nu 
                            a fost găsită în magazinul nostru.
                        </p>
                        <button
                            className="btn btn-dimmed"
                            type="button"
                            onClick={handleReset}
                        >
                            Resetare cautare
                        </button>
                    </div>
                </div>
            ) : null}
            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <Product key={product.id} details={product} />
                ))}
            </div>
        </>
    );
}
