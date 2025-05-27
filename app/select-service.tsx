import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SelectService = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = async (type) => {
    if (type === 'move') {
      setShowModal(true);
    } else {
      setSelectedOption(type);
      try {
        const res = await fetch("https://tucc-api.vercel.app/api/create-room");
        const { url } = await res.json();
        router.push({ pathname: '/home-consultation', params: { url } });
      } catch (err) {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Service</Text>
      <Text style={styles.subheading}>This helps us tailor your experience.</Text>

      <TouchableOpacity
        style={[styles.option, selectedOption === 'recurring' && styles.optionSelected]}
        onPress={() => handleSelect('recurring')}
      >
        <Text style={styles.optionText}>🏡 Recurring</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedOption === 'oneoff' && styles.optionSelected]}
        onPress={() => handleSelect('oneoff')}
      >
        <Text style={styles.optionText}>✨ One-Off</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedOption === 'move' && styles.optionSelected]}
        onPress={() => handleSelect('move')}
      >
        <Text style={styles.optionText}>📦 Move Out/In</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Heads up!</Text>
            <Text style={styles.modalText}>
              We aren’t offering Move Out/In cleanings at the moment — but we’d love to help with a one-time or recurring visit instead.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Choose Another</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 80,
    padding: 24,
    backgroundColor: '#F9F9FB',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  optionSelected: {
    backgroundColor: '#E6F0FF',
    borderColor: '#3478F6',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default SelectService;