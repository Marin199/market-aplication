import { Link } from "react-router";

export default function Landing() {
    return (
        <>
            <title>Super Market</title>
            <h1>Cumpărături online</h1>
            <p className="tagline text-dimmed">
                Comandă-ți alimentele de la Super Market cu aplicația 
                noastră ușor de utilizat și primește-ți produsele livrate direct la ușa ta.
            </p>
            <Link className="btn" to="/products">
                Comandă
            </Link>
            <img
                className="landing-cover"
                width="816"
                height="380"
                src="landing.jpg"
                alt="Display of fruits and vegetables"
            />
        </>
    );
}
