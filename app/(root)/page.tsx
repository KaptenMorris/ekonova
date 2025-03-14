import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { get } from "http"
import React from "react"

const Hem = async () => {
 const loggaIn = await  getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Välkommen"
            user={loggaIn?.name || 'Gäst'}
            subtext="Få åtkomst till och hantera ditt konto och dina transaktioner."
          />

          <TotalBalanceBox 
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={20000.35}
          />
        </header>

        SENASTE TRANSAKTIONER
      </div>

      <RightSidebar
      user={loggaIn}
      transactions={[]}
      banks={[{currentBalance: 1230.50},{currentBalance: 5000}]}
      />
    </section>
    
  )
}

export default Hem