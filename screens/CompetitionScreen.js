import { View, Text } from 'react-native';
import React from 'react';
import Layout from '../components/layout';
import Btn from '../components/Btn';
import TextBox from '../components/TextBox';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-web';
import { deleteOldImage, pickImage } from '../util/functions';
import useAuth from '../hooks/useAuth';

const CompetitionScreen = () => {
  const { currentUser } = useAuth();
  const [compArray, setCompArray] = useState({
    image: '',
    dates: '',
    currentHeat: '',
    name: '',
    message: '',
    id: '',
  });

  const [snapshot, loading, err] = useCollection(
    query(collection(db, 'competitions')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  function handleChange(text, eventName) {
    updateDoc(doc(db, 'competitions', compArray.id), {
      [eventName]: text,
    });
    setCompArray((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }
  const onPressPicture = async (e) => {
    e.preventDefault();
    let picURL = await pickImage('competitions', '', 300);
    console.log(picURL);
    deleteOldImage('competitions', compArray.image);
    handleChange(picURL, 'image');
  };
  useEffect(() => {
    if (snapshot) {
      let arr = [];
      snapshot.docs.forEach((doc1) => {
        console.log(doc1.id);
        arr.push({
          ...doc1.data(),
          id: doc1.id,
        });
      });

      console.log(snapshot.docs[0].data());
      setCompArray(arr[0]);
    }
  }, [snapshot]);

  return (
    <Layout>
      <View
        style={{
          width: '100%',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {currentUser.status == 'super' ? (
          <>
            <TextBox
              placeholder="Enter Competion Name"
              onChangeText={(text) => handleChange(text, 'name')}
              secureTextEntry={false}
              value={compArray.name}
            />
            <TextBox
              placeholder="Enter comp dates"
              onChangeText={(text) => handleChange(text, 'dates')}
              secureTextEntry={false}
              value={compArray.dates}
            />
          </>
        ) : (
          <>
            <View>
              <Text>{compArray.name}</Text>
            </View>
            <View>
              <Text>{compArray.dates}</Text>
            </View>
          </>
        )}

        {currentUser.status == 'super' ? (
          <TouchableOpacity
            style={tw`w-[92%] h-48 m-1 `}
            onPress={(e) => onPressPicture(e)}
          >
            {compArray.image > '' ? (
              <View
                style={[
                  tw` h-full w-full rounded-md`,
                  {
                    objectFit: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${compArray.image})`,
                  },
                ]}
              />
            ) : (
              <View style={tw` h-full w-full justify-center items-center`}>
                <Text>Please click to choose image</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TextBox
          placeholder="Enter urgent message"
          onChangeText={(text) => handleChange(text, 'message')}
          secureTextEntry={false}
          value={compArray.message}
        />
        <View
          style={tw`flex-row justify-center items-center flex-wrap w-[95%]`}
        >
          <Text style={tw`font-semibold text-lg mt-3 text-[#344869]`}>
            Current Heat #
          </Text>
          <View style={tw`flex-row justify-center items-center mb-2 w-[50%]`}>
            <TextBox
              placeholder="Enter current heat number"
              onChangeText={(text) => handleChange(text, 'currentHeat')}
              secureTextEntry={false}
              value={compArray.currentHeat}
            />
          </View>
        </View>
        <View
          style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
        >
          <Btn
            onClick={(e) => {
              if (compArray.currentHeat.match(/\d+/g) * 1 > 1)
                handleChange(
                  (compArray.currentHeat.match(/\d+/g) * 1 - 1).toString(),
                  'currentHeat'
                );
            }}
            title="Substruct"
            style={{ width: '48%', backgroundColor: '#3D1152', marginTop: 0 }}
          />
          <Btn
            onClick={() => {
              handleChange(
                (compArray.currentHeat.match(/\d+/g) * 1 + 1).toString(),
                'currentHeat'
              );
            }}
            title="Add"
            style={{ width: '48%', backgroundColor: '#344869', marginTop: 0 }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default CompetitionScreen;
