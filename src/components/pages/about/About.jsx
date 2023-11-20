import './about.css';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';

export default function About() {
  return (
    <>
      <Header />
      <div className='about'>
        <div className='aboutWrapper'>
          <h1 className='aboutTitle'>About me</h1>
          <div className='aboutDesc'>
            <h3>
              Aplicatia aceasta este pur <b>demonstrativa</b>, dar functionala.
            </h3>
            <br />
            <h4>
              <b>Ce se poate realiza cu ea ?</b>
            </h4>
            <br />
            <span className='aboutSpan'>
              Postari diverse facute de utilizatori <b>inregistrati</b>,
              editarea postarii, stergerea postarii. <br />
              Deasemenea se poate face o <b>filtrare</b> pe baza de
              <b> utilizator </b>
              sau pe baza de <b>categorie</b>.
            </span>
            <br />
            <br />
            <span className='aboutSpan'>
              Daca se da click pe o categorie din sidebar-ul din dreapta, vor fi
              afisate numai postarile din acea categorie. <br />
              Daca se da click pe un autor al unei postari, se vor afisa numai
              postarile realizate de acel utilizator.
            </span>
            <br />
            <br />
            <span className='aboutSpan'>
              Stergerea filtrului se face prin click pe optiunea <b>HOME</b> din
              meniu.
            </span>
            <br />
            <br />
            <span className='aboutSpan'>
              Se poate modifica profilul unui utilizator prin click pe imaginea
              de avatar din coltul din dreapta sus din meniu.
            </span>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
