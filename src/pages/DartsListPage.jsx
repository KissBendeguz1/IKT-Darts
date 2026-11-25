import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const DartsListPage = () => {
    const [dartses, setDartses] = useState([])
    const [isFetchPending, setFetchPending] = useState(false);
    const [hiba, setHiba] = useState()

    useEffect(()=> {
        setFetchPending(true);
        axios.get("https://darts.sulla.hu/darts")
                .then((res) => setDartses(res.data))
                .catch(() => {
                    setHiba(error)
                    console.log("Hiba: ", hiba)
                })
                .finally(()=> setFetchPending(false))
    }, []);
    return(
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? 
            <div className="spinner-border text-warning"></div> : 
            <div>
                <h2 className="text-dark text-center fs-1">Dartsozók: </h2>
                <h2>
                    {dartses.map((darts, index) => (
                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="fs-1 text-dark text-start">Dartsozó neve: {darts.name}</p>
                            <p className="fs-4 text-dark text-start">Szül. Év: {darts.birth_date}</p>
                            <p className="fs-4 text-danger text-start">Nyert világbajnokságok: {darts.world_ch_won}</p>
                            <div className="card-body">
                                <Link className="fs-3" to={darts.profile_url}>
                                Profile Link
                                </Link> <br />
                                <Link to={"/darts/" + darts.id}>
                                    <img style={{maxHeight: 200}} src={darts.image_url || "https://placehold.co/400x800"} alt={darts.nev} />
                                </Link> <br />
                                <Link to={"/darts/" + darts.id}><i className="bi bi-eye"></i></Link>&nbsp;&nbsp;
                                <Link to={"/mod-darts/" + darts.id}><i className="bi bi-pencil"></i></Link>&nbsp;&nbsp;
                                <Link to={"/del-darts/" + darts.id}><i className="bi bi-trash3"></i></Link>
                            </div>
                        </div>
                    ))}
                </h2>
            </div> }
        </div>
    )
}