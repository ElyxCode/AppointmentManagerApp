import React from 'react';
import {Pressable, SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {formatDate} from '../helper/formatDate';
import {PatientDate} from '../interface/interface';

interface Props {
  patient: PatientDate;
  setModalPatient: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<PatientDate>>;
}

export const InfoPatient = ({patient, setModalPatient, setPatient}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{...styles.title, marginTop: 20}}>
        Information {''}
        <Text style={styles.titleBold}>Patient</Text>
      </Text>

      <View>
        <Pressable
          onPress={() => {
            setModalPatient(false);
            setPatient({} as PatientDate);
          }}
          style={styles.btnClose}>
          <Text style={styles.btnCloseText}>Close</Text>
        </Pressable>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoField}>
          <Text style={styles.infoLabel}>Patient:</Text>
          <Text style={styles.infoValue}>{patient.patient}</Text>
        </View>
        <View style={styles.infoField}>
          <Text style={styles.infoLabel}>Owner:</Text>
          <Text style={styles.infoValue}>{patient.owner}</Text>
        </View>
        <View style={styles.infoField}>
          <Text style={styles.infoLabel}>Email owner:</Text>
          <Text style={styles.infoValue}>{patient.ownerEmail}</Text>
        </View>
        <View style={styles.infoField}>
          <Text style={styles.infoLabel}>Phone owner:</Text>
          <Text style={styles.infoValue}>{patient.ownerPhone}</Text>
        </View>
        <View style={styles.infoField}>
          <Text style={styles.infoLabel}>Discharge date:</Text>
          <Text style={styles.infoValue}>
            {formatDate(patient.dateDischarge)}
          </Text>
        </View>
        <View style={styles.infoField}>
          <Text style={styles.infoLabel}>Patient symptoms:</Text>
          <Text style={styles.infoValue}>{patient.patientSymptoms}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
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
  btnClose: {
    backgroundColor: '#E06900',
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCloseText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  infoField: {marginBottom: 10},
  infoLabel: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  infoValue: {fontWeight: '700', fontSize: 20, color: '#334155'},
});
