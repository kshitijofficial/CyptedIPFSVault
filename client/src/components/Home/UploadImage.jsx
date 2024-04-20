import { useState } from "react";
import { useWeb3Context } from "../../contexts/web3Provider/useContext";
import axios from "axios";
import { validateFile } from "../../utils/fileValidation";
import { ImageUp } from "lucide-react";
import { toast } from "react-hot-toast";
const UploadImage = ({ reloadEffect }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
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
        "http://localhost:3000/api/uploadImage",
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
    setLoading(true);
    try {
      const myPromise = async () => {
        const ipfsHash = await uploadFile();
        console.log(ipfsHash);
        const tx = await contractInstance.uploadFile(selectedAccount, ipfsHash);
        await tx.wait();
      };
      await toast.promise(myPromise(), {
        loading: "Uploading",
        success: "File Uploaded Successfully",
        error: (error) => {
          console.error(error);
          return "Error uploading file: " + error.message;
        },
      });

      reloadEffect();
    } catch (error) {
      console.error(error);
      alert("Error Upload File: " + error.message);
      toast.error("Error uploading file: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center gap-6">
      <p className="font-semibold md:text-[24px]">
        Upload file with Web3's Security
      </p>
      <div className="w-full flex justify-center items-center">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-[200px] md:w-[210px]"
        />
      </div>
      {file ? (
        <button
          onClick={handleImageUpload}
          disabled={!file || loading}
          className="border-sky-400 border-dotted p-2 border-2 rounded-md flex flex-col justify-center items-center hover:bg-sky-200"
        >
          <ImageUp />
          {loading ? "Uploading..." : "Upload"}
        </button>
      ) : (
        <p className="text-[20px] font-semibold text-red-500">
          First Please Choose a file to upload
        </p>
      )}

      <br />
    </div>
  );
};

export default UploadImage;
