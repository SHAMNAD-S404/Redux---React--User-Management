    import { useSelector } from "react-redux"
    import { RootState } from "../redux/store"
    import { useEffect, useRef, useState } from "react"
    import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
    import { app } from "../firebase"


    interface FormaData {
      profilePicture?:string,
      username?:string,
      email?:string,
      password?:string
    }
    
    
    const Profile : React.FC = () : JSX.Element => {

      const fileRef  = useRef<HTMLInputElement | null>(null)
      const [image,setImage] = useState<File|undefined>(undefined)
      const [imagePercent , setImagePercent] = useState<number>(0)
      const [imageError , setImageError ] = useState<string|boolean>(false)
      const [ formData , setFormData] = useState<FormaData>({})
     
       
      const {currentUser} = useSelector((state:RootState) => state.user)

      useEffect(()=> {
        if (image) {
          handleFileUpload(image)
        }
      },[image])

      const handleFileUpload = async (image: File) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
      
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Progress handler
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(progress));
          },
          (error: any) => {
            // Error handler
            setImageError(true);
            console.error(error);
            
          },
          () => {
            // Success handler
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                setFormData({ ...formData, profilePicture: downloadURL });
              });
          }
        );
      };
      return (
        <div className="p-3 max-w-lg mx-auto ">
          
            <h1 
            className="text-3xl font-semibold text-center my-7">
              Profile
            </h1>
            <form className="flex flex-col gap-3">

                <input
                 type="file"
                 ref={fileRef}
                 hidden
                 accept="image/*"
                 onChange={(e)=> {
                  if(e.target.files && e.target.files.length > 0){
                    setImage(e.target.files[0])
                  }
                 }} />

                <img 
                  src={formData.profilePicture || currentUser?.profilePicture}
                alt="user image"
                className="w-32 h-32 mt-2 self-center object-cover rounded-full cursor-pointer" 
                onClick={()=> fileRef.current?.click()}/>

                <p className='text-sm self-center'>
                  {imageError ? (
                    <span className="text-red-600"
                    >Error uploading image (file size must be less than 2 MB)
                    </span>) :
                    imagePercent > 0 && imagePercent < 100 ?
                    (
                      <span className="text-slate-700"
                      >{`uploading: ${imagePercent}%`}
                      </span>
                    ) : imagePercent === 100 ?
                    (
                      <span className="text-green-700">
                        Image uploded successfully
                      </span>
                    ) : ''
                  }

                </p>

                <p 
                  className="ms-2 font-mono text-gray-400 "
                  >User Name
                </p>
                <input 
                  type="text"
                  id="username"
                  defaultValue={currentUser?.username}
                  placeholder="Username"
                  className="bg-slate-100 rounded-lg p-3 "
                  />
                
                <p 
                  className="ms-2 font-mono text-gray-400"
                  >User Email
                </p>

                <input 
                  type="email"
                  id="email"
                  defaultValue={currentUser?.email}
                  placeholder="email"
                  className="bg-slate-100 rounded-lg p-3 "
                  /> 

                <p 
                  className="ms-2 font-mono text-gray-400 "
                  >User Passwod
                </p>

                <input 
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="bg-slate-100 rounded-lg p-3 "
                  />

                <button
                    type="button"
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase
                       hover:opacity-95 disabled:opacity-80"
                    >update

                </button>

                <div className="flex justify-between mt-5 ">

                  <span
                   className="text-white cursor-pointer bg-red-500 p-1.5 rounded-lg font-semibold hover:bg-purple-600"
                   >Delete account

                  </span>

                  <span
                   className="text-white cursor-pointer bg-blue-500 p-1.5 rounded-lg font-semibold hover:bg-green-600 "
                   >Sign out

                  </span>

                </div>



            </form>


        </div>
      )
    }
    
    export default Profile