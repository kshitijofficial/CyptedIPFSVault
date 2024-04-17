import { useEffect, useState, useMemo } from "react";
import { useWeb3Context } from "../../contexts/web3Provider/useContext";
import axios from "axios";
import "./GetImage.css";

const GetImage = ({reload}) => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(4);
    const { web3State } = useWeb3Context();
    const { contractInstance, selectedAccount } = web3State;
    const [imageStatus,setImageStatus]=useState(true)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllImages = async () => {
            setImageStatus(true)
            setLoading(true)
            try {  
              const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        "x-access-token": token,
                    },
                };
                if (!selectedAccount || !contractInstance) return;

                const ipfsHashes = await contractInstance.viewFiles(selectedAccount);             
                const ipfsHashesArray = Object.values(ipfsHashes);
                console.log(ipfsHashesArray)
                const response = await axios.post(
                    `http://localhost:3000/api/getAllImages?page=${currentPage}&limit=${imagesPerPage}`,ipfsHashesArray,config);
                console.log(response)
                    if(response.status===200){
                    const imageArray = response.data.decryptedImages;
                    console.log(imageArray.length)
                    !imageArray.length?setImageStatus(false):setImages(imageArray);     
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }finally {
                setLoading(false); // Stop loading
            }
        };

        getAllImages();
    }, [selectedAccount, contractInstance,currentPage, imagesPerPage,reload]);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <> 
          <br />
          { imageStatus?(images.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="image-grid">
                {images.map((imageUrl, index) => (
                    <div key={index} className="image-item">
                        <img src={`data:image/jpeg;base64,${imageUrl}`} alt={`Image ${index + 1}`} />
                    </div>
                ))} 
            </div>
          )):(<p>No Image To Display </p>)}
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1 || loading}>Previous</button>
            <span>{currentPage}</span>
            <button onClick={() => paginate(currentPage + 1)}  disabled={loading}>Next</button>
          </div>
        </>
    );
};

export default GetImage;
