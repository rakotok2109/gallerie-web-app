'use client'

import { useEffect, useState } from 'react';
import { fetchImages, uploadImage, deleteImage } from './actions';
import { createClient } from '@/lib/supabase/client'

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const supabase = createClient()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        window.location.href = '/login'
      }
    }

    fetchUser()
  }, [])

  if (!user) {
    return null
  }

  const handleUpload = async () => {
    if (file && user) {
      await uploadImage(file, user.id);
      const imgs = await fetchImages(user.id);
      setImages(imgs);
      setFile(null);
    }
  };

  const handleDelete = async (id, url) => {
    await deleteImage(id, url);
    const imgs = await fetchImages(user.id);
    setImages(imgs);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Ma Galerie</h1>

      {/* Upload Form */}
      <div className="flex flex-col items-center space-y-4 p-4 border border-gray-200 rounded-lg shadow-sm mb-8">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100
                     cursor-pointer"
        />
        <button
          onClick={handleUpload}
          disabled={!file}
          className="px-4 py-2 bg-blue-600 text-white rounded-md
                     hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                     transition"
        >
          Téléverser
        </button>
      </div>

      {/* Gallery */}
      {images.length === 0 ? (
        <p className="text-center text-gray-500">Aucune image pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group border rounded overflow-hidden">
              <img src={img.url} alt="Uploaded" className="w-full h-40 object-cover" />
              <button
                onClick={() => handleDelete(img.id, img.url)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;