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
  });


  useEffect(() => {
    if (snapshot) {
      let arr = [];
      snapshot.docs.forEach((doc1) => {
        arr.push({
          ...doc1.data(),
          id: doc1.id,
        });
      });
      setCompArray(arr[0]);

     
    }
  }, [snapshot]);

  const value = {
    image: compArray.image,
    dates: compArray.dates,
    currentHeat: compArray.currentHeat,
    name: compArray.name,
    message: compArray.message,
    id: compArray.id,
    programFileName: compArray.programFileName,
    competitors: compArray.competitors,
    heatIDs: compArray.heatIDs,
    dances: compArray.dances,
    items: compArray.items,
    records: compArray.records,
    program: compArray.program,
    heatIndex: compArray.heatIndex,
    studios: compArray.studios,
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
