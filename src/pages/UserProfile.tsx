import { useContext, useEffect, useState } from 'react';

import { appContext } from '../context/context';

import profileImg from '../assets/def-profile-img.png'
import { updateUser } from '../firebase/auth';

export const UserProfile = () => {

  const { auth } = useContext(appContext);

  const [isEdit, setIsEdit] = useState(false);
  const [displayName, setDisplayName] = useState('');

  console.log(auth);

  useEffect(() => {
    setDisplayName(auth.currentUser.displayName)
  },[])
  
  const handleFile = () => {
    //TODO
  } 
  
  const handleUploadImage = () => {
    //TODO
  }

  const handleUpdateData = () => {
    //TODO
    setIsEdit(!isEdit);
    if(!isEdit){
      return
    } else {
      //TODO
      updateUser(auth, displayName, 'test')
    }
  }
  return (
    <div className='flex flex-col justify-center items-center h-full'>


            <input type="file" accept='image/*' onChange={(e) => {handleFile(e)}}/>
            <button 
              type='submit' 
              className='bg-green-500 hover:bg-green-400 my-4 px-3 py-1 rounded-md'
              onClick={handleUploadImage}>
                Cargar
            </button>

        <img 
            src={profileImg} 
            alt="" 
            className='h-48 w-48 rounded-full'/>

        
        {
          !isEdit ?
          <h1 className='text-2xl capitalize'>{displayName}</h1>
          :
          <>
            <h1>
              Actualiza tu nombre
            </h1>
            <input 
            type="text" 
            value={displayName}
            className='rounded-md'
            onChange={e => setDisplayName(e.target.value)}
            />
          </>
        }

        <button 
          onClick={handleUpdateData}
          className='bg-green-500 hover:bg-green-400 hover:scale-125 my-4 px-3 py-1 rounded-md transition ease-in-out delay-150'>
          {!isEdit ? 'Editar' : 'Actualizar'}
        </button>
    </div>
  )
}
