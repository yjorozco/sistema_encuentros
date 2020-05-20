import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Component/Home';
import HomeApp from './Component/HomeApp';
import Pagar from './Component/Pagar';
import Curso from './Component/Curso';
import Inscrito from './Component/Inscrito';
import ConsultarCurso from './Component/ConsultarCurso';
import Certificado from './Component/Certificado';
import Apostillar from './Component/Apostillar'
import Salir from './Component/Salir'

// ak_5M4QLCrTvdqSwa3xEXXft3kNYC9ZVDzhnTQUKdJKbiSYGqdeq 3b03e84c6a2fc29d5419dbd1f99447bbe810157ef68a0d2ad60225c35148f3cd09de2574241b6b392f7df9d8adb8d771dbf7aad5b317ebd728171e730986c659

function App() {
  return (
    <>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home"  component={HomeApp} />
          <Route path="/pagar"  component={Pagar} />
          <Route path="/curso"  component={Curso} />
          <Route path="/consultarcurso"  component={ConsultarCurso} />
          <Route path="/certificado"  component={Certificado} />
          <Route path="/inscritos"  component={Inscrito} />
          <Route path="/apostillar"  component={Apostillar} />
          <Route path="/salir"  component={Salir} />
        </Switch>
    </>
  );
}

export default App;
