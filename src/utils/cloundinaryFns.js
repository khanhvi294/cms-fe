import axios from "axios";

const presetName = import.meta.env.VITE_REACT_APP_PRESET_NAME;
const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", presetName);
  formData.append("cloud_name", cloudName);
  formData.append("public_id", file.name);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      formData
    );
    console.log(res.data.url);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
