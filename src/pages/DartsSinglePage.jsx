import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export const DartsSinglePage = () => {
    const param = useParams();
    const id = param.DartsId;
    const [darts, setDarts] = useState(null)
    const [isPending, setPending] = useState(false);
    const [hiba, setHiba] = useState(null)

    useEffect(() => {
        setDarts(null);
        setHiba(null);
        setPending(true);
        axios.get(`https://darts.sulla.hu/darts/${id}`)
                .then((res) => setDarts(res.data))
                .catch((error) => {
                    setHiba(error)
                    console.log("Hiba:", error)
                })
                .finally(()=> setPending(false))
    }, [id]);

    return(
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending ? (
                <div className="spinner-border text-warning"></div>
            ) : hiba ? (
                <p className="text-danger">Nem sikerült betölteni a dartsozót.</p>
            ) : darts ? (
                <div>
                    <h2>Dartsozó adatai</h2>
                    <div className="card col-sm-3 d-inline-block m-1 p-2">
                        <p className="text-dark">Dartsozó neve: {darts.name}</p>
                        <p className="text-danger">Születési idő: {darts.birth_date}</p>
                        <p className="text-danger">Nyert világbajnokságok: {darts.world_ch_won}</p>
                        <div className="card-body">
                            <a target="_blank" rel="noreferrer" href={darts.profile_url}>
                                Profil link
                            </a>
                            <br />
                            <img
                                style={{maxHeight: 200}}
                                src={darts.image_url || "https://placehold.co/400x800"}
                                alt={darts.name}
                            />
                            <br />
                            <Link to="/"><i className="bi bi-arrow-return-left"></i></Link>&nbsp;&nbsp;
                            <Link to={"/mod-darts/" + darts.id}><i className="bi bi-pencil"></i></Link>&nbsp;&nbsp;
                            <Link to={"/del-darts/" + darts.id}><i className="bi bi-trash3"></i></Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}