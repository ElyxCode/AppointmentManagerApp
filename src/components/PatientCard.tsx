import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {formatDate} from '../helper/formatDate';
import {PatientDate} from '../interface/interface';

interface Props {
  item: PatientDate;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editPatient: (id: string) => void;
  deletePatient: (id: string) => void;
  setModalPatient: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<PatientDate>>;
}

export const PatientCard = ({
  item,
  setModalVisible,
  editPatient,
  deletePatient,
  setModalPatient,
  setPatient,
}: Props) => {
  const formatedDate = formatDate(item.dateDischarge);

  return (
    <Pressable
      onLongPress={() => {
        setModalPatient(true);
        setPatient(item);
      }}>
      <View style={styles.container}>
        <Text style={styles.labelPatient}>Patient:</Text>
        <Text style={styles.textPatient}>{item.patient}</Text>
        <Text style={styles.dateCreatAt}>{formatedDate}</Text>

        <View style={styles.btnCardContainer}>
          <Pressable
            style={[styles.btn, styles.btnEdit]}
            onPress={() => {
              setModalVisible(true);
              editPatient(item.uid);
            }}>
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnDelete]}
            onPress={() => deletePatient(item.uid)}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
  },
  labelPatient: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  textPatient: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  dateCreatAt: {
    color: '#374151',
  },
  btnCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: '#F59E0B',
  },
  btnDelete: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});
