import { useContext } from "react";
import Price from "./Price";
import { Link, useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CartContext } from "./CartContext";
import { get } from "./fetcher";

export default function ProductDetails() {
    const { id } = useParams();
    const { handleAddProduct } = useContext(CartContext);

    const { data } = useSuspenseQuery({
        queryKey: ["products/details", id],
        queryFn: () => get(`products?id=eq.${id}`),
        staleTime: 1000 * 60 * 5, // 5 minute
    });

    const details = data[0];

    return (
        <>
            <Link to="/products" className="back">
                &lsaquo; Inapoi la produse
            </Link>
            <title>{`${details.name} | SuperM`}</title>
            <div className="details">
                <div>
                    <img
                        src={details.thumbnail}
                        alt={details.name}
                        width="612"
                        height="408"
                        className="details-image"
                    />

                    <h2>Detalii produs</h2>
                    <table className="nutrition">
                        <thead>
                            <tr>
                                <th>Nutrienti</th>
                                <th>Valoare</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Proteine</td>
                                <td>{details.nutrition.protein} g</td>
                            </tr>
                            <tr>
                                <td>Carbohidrati</td>
                                <td>{details.nutrition.carbs} g</td>
                            </tr>
                            <tr>
                                <td>Grasimi</td>
                                <td>{details.nutrition.fat} g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1 className="details-name">{details.name}</h1>
                    <p className="details-price">
                        <Price
                            finalPrice={details.final_price}
                            originalPrice={details.original_price}
                        />
                    </p>
                    <p
                        className="text-dimmed"
                        dangerouslySetInnerHTML={{
                            __html: details.description,
                        }}
                    ></p>
                    <div className="details-a2c">
                        <button
                            className="btn btn-block"
                            onClick={() => handleAddProduct(details)}
                        >
                            Adauga in cos
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
