import React, {useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import {useForm} from '../hooks/useForm';

import DatePicker from 'react-native-date-picker';

import {PatientDate} from '../interface/interface';

interface Props {
  modalVisible: boolean;
  newDateHandler: () => void;
  setPatients: React.Dispatch<React.SetStateAction<PatientDate[]>>;
  patients: PatientDate[];
  patient: PatientDate;
  setPatient: React.Dispatch<React.SetStateAction<PatientDate>>;
}

export const RegisterForm = ({
  modalVisible,
  newDateHandler,
  setPatients,
  patients,
  setPatient,
  patient: patientEdit,
}: Props) => {
  const initialValue: PatientDate = {
    uid: '',
    patient: '',
    owner: '',
    ownerEmail: '',
    ownerPhone: '',
    dateDischarge: new Date(),
    patientSymptoms: '',
  };

  const {
    form,
    setFormValue,
    uid,
    patient,
    owner,
    ownerEmail,
    ownerPhone,
    dateDischarge,
    patientSymptoms,
    onChange,
  } = useForm(initialValue);

  useEffect(() => {
    if (Object.keys(patientEdit).length > 0) {
      setFormValue(patientEdit as PatientDate);
    }
  }, [patientEdit]);

  const handleDate = () => {
    if (
      [
        patient,
        owner,
        ownerEmail,
        ownerPhone,
        dateDischarge,
        patientSymptoms,
      ].includes('')
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const newPatient: PatientDate = {
      uid: '',
      patient,
      owner,
      ownerEmail,
      ownerPhone,
      dateDischarge,
      patientSymptoms,
    };

    if (uid) {
      newPatient.uid = uid;

      const updatePatient = patients.map(patientState =>
        patientState.uid === newPatient.uid ? newPatient : patientState,
      );

      setPatients(updatePatient);
      // console.log('updatePatient', updatePatient);
      setPatient({} as PatientDate);
    } else {
      newPatient.uid = Date.now().toString();
      setPatients([...patients, newPatient]);
    }

    setFormValue(cleanInputs);
    newDateHandler();
  };

  const cleanInputs: PatientDate = {
    uid: '',
    patient: '',
    owner: '',
    ownerEmail: '',
    ownerPhone: '',
    dateDischarge: new Date(),
    patientSymptoms: '',
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            {Object.keys(patientEdit).length > 0 ? 'Edit' : 'New'} {''}
            <Text style={styles.titleBold}>Date</Text>
          </Text>

          <Pressable
            style={styles.btnCancel}
            onLongPress={() => {
              setPatient({} as PatientDate);
              setFormValue(cleanInputs);
              newDateHandler();
            }}>
            <Text style={styles.btnCancelText}>Cancel</Text>
          </Pressable>

          <View style={styles.field}>
            <Text style={styles.label}>Patient name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Patient name"
              placeholderTextColor={'#666'}
              onChangeText={value => onChange(value, 'patient')}
              value={patient}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner name"
              placeholderTextColor={'#666'}
              onChangeText={value => onChange(value, 'owner')}
              value={owner}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner email:</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Owner email"
              placeholderTextColor={'#666'}
              onChangeText={value => onChange(value, 'ownerEmail')}
              value={ownerEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner phone:</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner phone"
              keyboardType="number-pad"
              placeholderTextColor={'#666'}
              onChangeText={value => onChange(value, 'ownerPhone')}
              value={ownerPhone}
              maxLength={8}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Discharge Date</Text>
            <View style={styles.dateContainer}>
              <DatePicker
                date={dateDischarge}
                locale="en"
                onDateChange={date =>
                  setFormValue({...form, dateDischarge: date})
                }
                androidVariant="nativeAndroid"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Patient symptoms:</Text>
            <TextInput
              style={[styles.input, styles.symptomsInput]}
              placeholder="patient symptoms"
              placeholderTextColor={'#666'}
              onChangeText={value => onChange(value, 'patientSymptoms')}
              value={patientSymptoms}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNewDate} onPress={handleDate}>
            <Text style={styles.btnNewDateText}>
              {Object.keys(patientEdit).length > 0 ? 'Edit' : 'Add patient'}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D28D9',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titleBold: {
    fontWeight: '900',
  },
  field: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  symptomsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    backgroundColor: '#5827A4',
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  btnNewDate: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNewDateText: {
    textAlign: 'center',
    color: '#5827A4',
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 16,
  },
});
