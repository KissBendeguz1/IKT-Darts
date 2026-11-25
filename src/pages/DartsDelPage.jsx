import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const DartsDelPage = () => {
    const param = useParams();
    const id = param.DartsId;
    const [darts, setDarts] = useState(null);
    const [isPending, setPending] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDarts(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://darts.sulla.hu/darts/${id}`);
            setShowModal(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending || !darts ?
            <div className="spinner-border text-warning"></div> : 
            <div>
                <h2>Dartsozó törlése</h2>
                <p>Biztosan törölni szeretné a következő dartsozót: <strong>{darts.name}</strong>?</p>
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(true)}>Törlés</button>
                <Link to="/" className="btn btn-warning ms-2">Vissza</Link>
            </div> }

            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Törlés megerősítése</h5>
                                    <button type="button" className="btn-close" aria-label="Bezárás" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    A törlés nem vonható vissza.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Mégse</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Törlés</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}