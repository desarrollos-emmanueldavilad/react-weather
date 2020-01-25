import React, {useState, useEffect} from 'react';
import Header  from './components/header';
import Formulario from './components/formulario';
import Error  from './components/error';
import Clima from './components/clima';
function App() {


  // state principal

  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({})
  useEffect(()=>{
    const consultarAPI = async () =>{

      const appId = '1d0858043c4a680b0b86f31397b7473d';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
   
      //consultar la URL

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);
   
    }


    //prevenir ejecucion
    if(ciudad === '') return;
    consultarAPI();
  }, [ciudad, pais]);

  const datosConsulta = datos => {
    //validar que ambos campos esten

    if (datos.ciudad === '' || datos.pais === '') {
      //un error
      guardarError(true);
      return;
    }

    //ciudad y pais existen, agregar al state

    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);


   
  }

  let componente;
     if(error){
      //hay un error, mostrartlo
     componente = <Error mensaje='Ambos campos son obligatorios'/>
    }else if(resultado.cod === '404'){
      componente = <Error mensaje= "La ciudad no existe en nuestro regístro"/>
    }else{
      //mostrar el clima
      componente = <Clima 
        resultado={resultado}
      />
    }

    

  return (
   <div className="App">
     <Header
     titulo='Clima React App'
     />
     <div className="contenedor-form">
       <div  className="container">
         <div  className="row">
         <div  className="col s12 m6">
           <Formulario
           datosConsulta={datosConsulta}
           />
         </div>
         <div  className="col s12 m6">
          {componente}
         </div>
         </div>
       </div>
     </div>
   </div>
  );
}

export default App;
