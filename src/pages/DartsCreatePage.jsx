import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export const DartsCreatePage = () => {
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            await axios.post("https://darts.sulla.hu/darts",
                {
                    name: formData.get("name"),
                    birth_date: String(formData.get("birth_date") ?? ""),
                    world_ch_won: formData.get("world_ch_won"),
                    profile_url: formData.get("profile_url"),
                    image_url: formData.get("image_url")
                }
            )
            navigate("/")
        } catch (error) {
            console.error(error);
            
        }
    }
    return (
        <div className="p-5 content bg-ivory text-center">
            <h2>Új dartsozó felvitele</h2>
            <form onSubmit={handleSubmit}> 
                <div className="form-group row-pb-3">
                    <label className="col-sm3 col-form-label">Dartsozó neve:</label>
                    <div>
                        <input type="text" name="name" className="form-control" />
                    </div>
                </div>

                                <div className="form-group row-pb-3">
                    <label className="col-sm3 col-form-label">Születési dátum:</label>
                    <div>
                        <input type="date" name="birth_date" className="form-control" />
                    </div>
                </div>

                                <div className="form-group row-pb-3">
                    <label className="col-sm3 col-form-label">Vb nyerések:</label>
                    <div>
                        <input type="number" name="world_ch_won" className="form-control" />
                    </div>
                </div>

                                <div className="form-group row-pb-3">
                    <label className="col-sm3 col-form-label">Profil link</label>
                    <div>
                        <input type="text" name="profile_url" className="form-control" />
                    </div>
                </div>

                                <div className="form-group row-pb-3">
                    <label className="col-sm3 col-form-label">kép link:</label>
                    <div>
                        <input type="text" name="image_url" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
                <Link to="/" className="btn btn-warning"><i className="bi bi-arrow-left"></i>Vissza</Link>
            </form>

        </div>
    );
}