import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  View,
  FlatList,
  Alert,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {InfoPatient} from './components/InfoPatient';
import {PatientCard} from './components/PatientCard';

import {RegisterForm} from './components/RegisterForm';
import {PatientDate} from './interface/interface';

export const AppAppointments = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [patients, setPatients] = useState<PatientDate[]>([]);
  const [patient, setPatient] = useState<PatientDate>({} as PatientDate);
  const [modalPatient, setModalPatient] = useState<boolean>(false);

  const newDateHandler = () => {
    setModalVisible(modalVisible => !modalVisible);
  };

  const editPatient = (id: string) => {
    const findPatient = patients.filter(item => item.uid === id);
    setPatient(findPatient[0]);
  };

  const deletePatient = (id: string) => {
    Alert.alert(
      'Do you want to delete this patient?',
      'Eliminated patient cannot be recovered',
      [
        {text: 'Cancel'},
        {
          text: 'Yes, delete',
          onPress: () => {
            const patientsUpdate = patients.filter(item => item.uid !== id);

            setPatients(patientsUpdate);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Appointment Manager {''}
        <Text style={styles.titleBold}>Veterinary</Text>
      </Text>
      <Pressable style={styles.btnNewDate} onPress={newDateHandler}>
        <Text style={styles.btnTextNewDate}>New date</Text>
      </Pressable>
      <View style={styles.listContainer}>
        {patients.length > 0 ? (
          <View>
            <FlatList
              style={styles.listDates}
              data={patients}
              keyExtractor={item => item.uid.toString()}
              renderItem={({item}) => {
                return (
                  <PatientCard
                    item={item}
                    setModalVisible={setModalVisible}
                    setPatient={setPatient}
                    editPatient={editPatient}
                    deletePatient={deletePatient}
                    setModalPatient={setModalPatient}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            <Icon name="file-tray-outline" size={100} color="#bebebe" />
            <Text style={{color: '#bebebe'}}>There are no items</Text>
          </View>
        )}
      </View>

      {modalVisible && (
        <RegisterForm
          modalVisible={modalVisible}
          newDateHandler={newDateHandler}
          setPatients={setPatients}
          patients={patients}
          patient={patient}
          setPatient={setPatient}
        />
      )}

      <Modal visible={modalPatient} animationType="slide">
        <InfoPatient
          patient={patient}
          setModalPatient={setModalPatient}
          setPatient={setPatient}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    padding: 10,
  },
  listContainer: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: '#374151',
  },
  titleBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNewDate: {
    backgroundColor: '#6D28D9',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 60,
    borderRadius: 20,
  },
  btnTextNewDate: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  listDates: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
