import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { signAPI, userAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function DayDetailScreen() {
  const route = useRoute();
  const { dayNumber } = route.params as { dayNumber: number };
  const { user } = useAuthStore();
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [signLogged, setSignLogged] = useState(false);

  // Mock day data - in production, fetch from backend
  const dayData = {
    title: `Day ${dayNumber}: The Spark`,
    description: 'Awakening to intention',
    signChallenge: 'A White Feather',
    signDescription: 'Look for a white feather today',
    meditationScript: 'Welcome to the Road...',
    audioUrl: 'https://archive.org/download/guided-meditation-forest/forest-meditation.mp3',
  };

  const playAudio = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: dayData.audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            handleMeditationComplete();
          }
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const handleMeditationComplete = async () => {
    try {
      await userAPI.updateProgress({
        day_number: dayNumber,
        completed: true,
      });
      Alert.alert('Success', 'Meditation completed! +10 Sparks');
    } catch (error) {
      Alert.alert('Error', 'Failed to save progress');
    }
  };

  const handleLogSign = async () => {
    try {
      await signAPI.createSignLog({
        day_number: dayNumber,
        sign_name: dayData.signChallenge,
        note: 'Found the sign!',
      });
      setSignLogged(true);
      Alert.alert('Success', 'Sign logged! +5 Sparks');
    } catch (error) {
      Alert.alert('Error', 'Failed to log sign');
    }
  };

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dayNumber}>Day {dayNumber}</Text>
        <Text style={styles.title}>{dayData.title}</Text>
        <Text style={styles.description}>{dayData.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guided Meditation</Text>
        <TouchableOpacity style={styles.playButton} onPress={playAudio}>
          <Text style={styles.playButtonText}>
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.script}>{dayData.meditationScript}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sign of the Day</Text>
        <Text style={styles.signChallenge}>{dayData.signChallenge}</Text>
        <Text style={styles.signDescription}>{dayData.signDescription}</Text>
        
        {signLogged ? (
          <View style={styles.signLogged}>
            <Text style={styles.signLoggedText}>✓ Sign Logged!</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.logButton} onPress={handleLogSign}>
            <Text style={styles.logButtonText}>I Found the Sign!</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2d2d2d',
  },
  dayNumber: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#9ca3af',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d2d',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  playButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  script: {
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 24,
  },
  signChallenge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 8,
  },
  signDescription: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  logButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signLogged: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  signLoggedText: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: '600',
  },
});
