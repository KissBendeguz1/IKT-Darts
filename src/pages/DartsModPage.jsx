import { useEffect, useState} from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const DartsModPage = () => {
    const params = useParams();
    const id = params.DartsId;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [darts, setDarts] = useState({
        name: "",
        birth_date: "",
        world_ch_won: 0,
        profile_url: "",
        image_url: ""
    });

    useEffect(() => {
        const fetchDartsData = async () => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDarts({
                    ...response.data,
                    birth_date: String(response.data.birth_date ?? "")
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchDartsData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://darts.sulla.hu/darts/${id}`, {
                ...darts,
                birth_date: String(darts.birth_date)
            });
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDarts((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="p-5 content bg-ivory text-center">
                <h2>Dartsozó módosítása</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row-pb-3">
                        <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
                        <div>
                            <input type="text" name="name" className="form-control" value={darts.name ?? ""} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group row-pb-3">
                        <label className="col-sm-3 col-form-label">Születési dátum:</label>
                        <div>
                            <input type="date" name="birth_date" className="form-control" value={darts.birth_date ?? ""} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group row-pb-3">
                        <label className="col-sm-3 col-form-label">Világbajnoki győzelmek:</label>
                        <div>
                            <input type="number" name="world_ch_won" className="form-control" value={darts.world_ch_won ?? ""} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group row-pb-3">
                        <label className="col-sm-3 col-form-label">Profil link:</label>
                        <div>
                            <input type="text" name="profile_url" className="form-control" value={darts.profile_url ?? ""} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group row-pb-3">
                        <label className="col-sm-3 col-form-label">Kép link:</label>
                        <div>
                            <input type="text" name="image_url" className="form-control" value={darts.image_url ?? ""} onChange={handleInputChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Küldés</button>
                    <Link to="/" className="btn btn-warning ms-2"><i className="bi bi-arrow-left"></i> Vissza</Link>
                </form>
            </div>

            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-white">
                                    <h5 className="modal-title">Sikeres módosítás</h5>
                                    <button type="button" className="btn-close btn-close-white" aria-label="Bezárás" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    A dartsozó adatait sikeresen módosítottuk.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success" onClick={() => navigate("/")}>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}