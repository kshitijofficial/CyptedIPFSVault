import { useState } from "react";
import { useWeb3Context } from "../../contexts/web3Provider/useContext";
import axios from "axios";

import { validateFile } from "../../utils/fileValidation";

const UploadImage = ({ reloadEffect }) => {
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false); // State to manage loading status
    const { web3State } = useWeb3Context();
    const { contractInstance, selectedAccount } = web3State;

    const uploadFile = async () => {
        try {
            validateFile(file);
            const formData = new FormData();
            formData.append("file", file);
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "x-access-token": token,
                },
            };
            const res = await axios.post(
                `http://localhost:3000/api/uploadImage`,
                formData,
                config
            );
            if (res.data.message !== "Upload Successful!!!") {
                throw new Error(res.data.message);
            }
            return res.data.ipfsHash;
        } catch (error) {
            console.error("Error Uploading File:", error.message);
            throw error; // Rethrow error to be caught by the caller
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const ipfsHash = await uploadFile();
            console.log(ipfsHash);
            const tx = await contractInstance.uploadFile(selectedAccount, ipfsHash);
            await tx.wait();
            reloadEffect();
        } catch (error) {
            console.error(error);
            alert("Error Upload File: " + error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleImageUpload} disabled={!file || loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
            <br />
        </div>
    );
};

export default UploadImage;
