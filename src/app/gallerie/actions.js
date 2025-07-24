'use client'
import { createClient } from '@/lib/supabase/client'

// Récupérer l'utilisateur connecté
export async function getUser() {
    const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Erreur récupération user:', error);
    return null;
  }
  return user;
}

// Récupérer les images de l'utilisateur
export async function fetchImages(userId) {
    const supabase = await createClient()

  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur fetch images:', error);
    return [];
  }
  return data;
}

// Uploader une image
export async function uploadImage(file, userId) {
    const supabase = await createClient()

  const filePath = `${userId}/${Date.now()}_${file.name}`;

  const { error: uploadError } = await supabase
    .storage
    .from('user-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Erreur upload image:', uploadError);
    return;
  }

  const { data: { publicUrl } } = supabase
    .storage
    .from('user-images')
    .getPublicUrl(filePath);

  const { error: insertError } = await supabase
    .from('images')
    .insert({ user_id: userId, url: publicUrl });

  if (insertError) {
    console.error('Erreur insert DB:', insertError);
  }
}

// Supprimer une image
export async function deleteImage(id, url) {
    const supabase = await createClient()

  const path = url.split('/user-images/')[1];

  const { error: storageError } = await supabase
    .storage
    .from('user-images')
    .remove([path]);

  const { error: dbError } = await supabase
    .from('images')
    .delete()
    .eq('id', id);

  if (storageError || dbError) {
    console.error('Erreur suppression:', storageError || dbError);
  }
}