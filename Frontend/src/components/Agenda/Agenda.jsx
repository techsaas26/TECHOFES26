import { useState } from "react";
import AgendaMenu from "./AgendaMenu";
import AgendaDayDetailsPage from "./AgendaDayDetailsPage";
import { agendaData } from "./agendaData";
import Footer from "../Footer/Footer";


export default function Agenda() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const handleBackToMenu = () => {
    setSelectedDay(null);
  };

  if (selectedDay) {
    return (
      <>
        <AgendaDayDetailsPage day={selectedDay} onBack={handleBackToMenu} />
        
      </>
    );
  }

  return <AgendaMenu onSelectDay={handleSelectDay} onClose={handleBackToMenu} />;
}
