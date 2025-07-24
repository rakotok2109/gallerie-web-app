import HomePageView from "@/views/HomePageView";
import supabase from '../lib/supabase';

export default async function Home() {  
  const { data: { user} } = await supabase.auth.getUser()
  return (
    <HomePageView></HomePageView>
  );
}