import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { singOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface FormaData {
  profilePicture?: string;
  username?: string;
  email?: string;
  password?: string;
}

const Profile: React.FC = (): JSX.Element => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState<number>(0);
  const [imageError, setImageError] = useState<string | boolean>(false);
  const [formData, setFormData] = useState<FormaData>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handler
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error: any) => {
        // Error handler
        setImageError(true);
        console.error(error);
      },
      () => {
        // Success handler
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const updateUser = async () => {
    const username = (
      document.getElementById("username") as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    const userAlert = document.getElementById("P-username") as HTMLElement;
    const emailAlert = document.getElementById("P-email") as HTMLElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[A-Za-z ]{4,10}$/;

    if (!usernameRegex.test(username)) {
      userAlert.style.color = "red";
      userAlert.textContent = "Length should be 4-10.characters only allowed";
      return;
    } else {
      userAlert.textContent = "";
    }

    if (!emailRegex.test(email)) {
      emailAlert.style.color = "red";
      emailAlert.textContent = "Enter valid email";
    } else {
      emailAlert.textContent = "";
    }

    const res = await fetch("/api/user/update-profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        email: email,
        profilePicture: formData?.profilePicture,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.success);
    } else {
      toast.error(data.error);
    }
  };

  const signOutHandle = async () => {
    try {
      const response = await axios.get("/api/auth/sign-out", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(singOut());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletAc = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete("/api/user/delete-account", {
            withCredentials: true,
          });

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success",
            }).then(() => {
              dispatch(singOut());
              navigate("/sign-in");
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="dark"
      />

      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImage(e.target.files[0]);
            }
          }}
        />

        <img
          src={formData.profilePicture || currentUser?.profilePicture}
          alt="user image"
          className="w-32 h-32 mt-2 self-center object-cover rounded-full cursor-pointer"
          onClick={() => fileRef.current?.click()}
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-600">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              {`uploading: ${imagePercent}%`}
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploded successfully</span>
          ) : (
            ""
          )}
        </p>

        <p id="P-username" className="ms-2 font-mono text-gray-400 ">
          User Name
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser?.username}
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 "
        />

        <p id="P-email" className="ms-2 font-mono text-gray-400">
          User Email
        </p>

        <input
          type="email"
          id="email"
          defaultValue={currentUser?.email}
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3 "
        />

        <button
          type="button"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase font-semibold
                       hover:opacity-95 disabled:opacity-80 hover:bg-blue-500"
          onClick={updateUser}
        >
          update
        </button>

        <div className="flex justify-between mt-5 ">
          <span
            className="text-white cursor-pointer bg-red-500 p-1.5 rounded-lg font-semibold hover:bg-purple-600"
            onClick={handleDeletAc}
          >
            Delete account
          </span>

          <span
            className="text-white cursor-pointer bg-blue-500 p-1.5 rounded-lg font-semibold hover:bg-green-600 "
            onClick={signOutHandle}
          >
            Sign out
          </span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
