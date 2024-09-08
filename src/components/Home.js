import React, {useContext, useEffect} from 'react';
import NoteContext from '../context/notes/noteContext';

const Home = () => {
  const a = useContext(NoteContext)
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  },[])

  return (
    <div>
      This is Home {a.state.name} {a.state.class}
    </div>
  )
}

export default Home


//rafc - to boiler plate