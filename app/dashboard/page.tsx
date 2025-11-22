import { redirect } from 'next/navigation'
import { logout } from './actions'
import { createClient } from '@/utils/supabase/server'
import './dashboard.css'
import { Suspense } from 'react'


async function GetUserData(){
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims || {};
  //  if (!data?.claims) {
  //   redirect('/account/login');
  // }

  return(
      <div className="dashboard-container">

    <div className="dashboard-box">
      <h2 className="dashboard-title">User Data</h2>
      <ul className="dashboard-list">
        {Object.entries(claims).map(([key, value]) => (
          <li key={key} className="dashboard-item">
            <span className="dashboard-key">{key}</span>
            <span className="dashboard-value">
              {typeof value === "object" ? JSON.stringify(value) : String(value)}
            </span>
          </li>
        ))}
      </ul>
       
      <form action={logout}>
        <button type="submit" className="btn-logout">Logout User:ID {data?.claims.sub}</button>
      </form>
    </div>
    
  </div>
  )
}

export default async function Dashboard() {
  

  return (
   <>
    <Suspense fallback={<p>Loading...</p>}>
       <GetUserData />
    </Suspense>

   </>
  );
}