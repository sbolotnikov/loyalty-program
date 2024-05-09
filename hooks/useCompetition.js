import { createContext, useContext, useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase';
const CompetitionContext = createContext({});

export const CompetitionProvider = ({ children }) => {
  const [snapshot, loading, err] = useCollection(
    query(collection(db, 'competitions')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [compArray, setCompArray] = useState({
    image: '',
    dates: '',
    currentHeat: '',
    name: '',
    message: '',
    id: '',
    program: '',
    programFileName: '',
    mode:'',
    fontSize:"",
    displayedPictures:[],
    displayedVideos:[],
    videoChoice:{},
    videoBGChoice:{},
    compLogo:{},
    displayedPicturesAuto:[],
    manualPicture:{},
    seconds:0,
    titleBarHider:false,
  });
  const [compID, setCompID] = useState('');

  useEffect(() => {
    if (snapshot) {
      let arr = [];
      snapshot.docs.forEach((doc1) => {
        arr.push({
          ...doc1.data(),
          id: doc1.id,
        });
      });
      setCompArray(arr.filter((x)=>x.id==compID));

     
    }
  }, [snapshot]);
  useEffect(() => {
    console.log("in useEffect" +compID)
    if (snapshot) {
      let arr = [];
      snapshot.docs.forEach((doc1) => {
        arr.push({
          ...doc1.data(),
          id: doc1.id,
        });
      });
      setCompArray(arr.filter((x)=>x.id==compID));

     
    }
  }, [compID]);
  const value = {
    image: compArray[0] ? compArray[0].image:"",
    dates: compArray[0] ? compArray[0].dates:"",
    currentHeat: compArray[0] ? compArray[0].currentHeat:"",
    name: compArray[0]? compArray[0].name:"",
    message: compArray[0]? compArray[0].message:"",
    id: compArray[0] ? compArray[0].id: "",
    programFileName: compArray[0]? compArray[0].programFileName:"",
    competitors: compArray[0]? compArray[0].competitors:[],
    heatIDs: compArray[0]? compArray[0].heatIDs:[],
    dances: compArray[0] ? compArray[0].dances:[],
    items: compArray[0] ? compArray[0].items:[],
    records: compArray[0]? compArray[0].records:[],
    program: compArray[0] ? compArray[0].program:[],
    heatIndex: compArray[0] ? compArray[0].heatIndex:undefined,
    studios: compArray[0] ? compArray[0].studios:[],
    mode: compArray[0] ? compArray[0].mode:'',
    fontSize: compArray[0] ? compArray[0].fontSize:'',
    displayedPictures: compArray[0] ? compArray[0].displayedPictures:[],
    displayedVideos: compArray[0] ? compArray[0].displayedVideos:[],
    videoBGChoice: compArray[0] ? compArray[0].videoBGChoice:{},
    videoChoice: compArray[0] ? compArray[0].videoChoice:{},
    compLogo: compArray[0] ? compArray[0].compLogo:{},
    titleBarHider: compArray[0] ? compArray[0].titleBarHider:false,
    displayedPicturesAuto: compArray[0] ? compArray[0].displayedPicturesAuto:[],
    seconds: compArray[0] ? compArray[0].seconds:10,
    manualPicture: compArray[0] ? compArray[0].manualPicture:{},
    setCompID
  };
  
  return (
    <CompetitionContext.Provider value={value}>
      {children}
    </CompetitionContext.Provider>
  );
};

export default function useCompetition() {
  return useContext(CompetitionContext);
}
