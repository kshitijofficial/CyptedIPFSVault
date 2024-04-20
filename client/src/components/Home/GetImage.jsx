import { useEffect, useState, useMemo } from "react";
import { useWeb3Context } from "../../contexts/web3Provider/useContext";
import axios from "axios";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const GetImage = ({ reload }) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(4);
  const { web3State } = useWeb3Context();
  const { contractInstance, selectedAccount } = web3State;
  const [imageStatus, setImageStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllImages = async () => {
      setImageStatus(true);
      setLoading(true);
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
        console.log(ipfsHashesArray);

        const myPromise = async () => {
          try {
            const response = await axios.post(
              `http://localhost:3000/api/getAllImages?page=${currentPage}&limit=${imagesPerPage}`,
              ipfsHashesArray,
              config
            );
            console.log(response);
            if (response.status === 200) {
              const imageArray = response.data.decryptedImages;
              console.log(imageArray.length);
              !imageArray.length
                ? setImageStatus(false)
                : setImages(imageArray);
            }
            return response;
          } catch (error) {
            throw error;
          }
        };

        await toast.promise(myPromise(), {
          loading: "Loading Images",
          success: "Images loaded successfully",
          error: (error) => {
            console.error("Error fetching images:", error);
            return "Error fetching images: " + error.message;
          },
        });
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getAllImages();
  }, [selectedAccount, contractInstance, currentPage, imagesPerPage, reload]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <br />
      {imageStatus ? (
        images.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="flex justify-start md:justify-center items-center w-full  overflow-x-auto">
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${imageUrl}`}
                alt={`Image ${index + 1}`}
                className="w-[300px] h-[240px]  mx-2 object-cover"
              />
            ))}
          </div>
        )
      ) : (
        <p>No Image To Display on page {currentPage}</p>
      )}
      <div className="w-full h-20 flex justify-center items-center gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <CircleArrowLeft className="w-8 h-8 opacity-80" />
        </button>
        <span className="font-bold text-[24px]">{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={loading}>
          <CircleArrowRight className="w-8 h-8 opacity-80" />
        </button>
      </div>
    </>
  );
};

export default GetImage;
