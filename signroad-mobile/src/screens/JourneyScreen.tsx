import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';

// Mock day data - in production, fetch from backend
const DAYS = Array.from({ length: 90 }, (_, i) => ({
  dayNumber: i + 1,
  title: `Day ${i + 1}`,
  isCompleted: false,
  isLocked: i >= 14, // Free: Days 1-14, Premium: Days 15-90
}));

export default function JourneyScreen() {
  const navigation = useNavigation();
  const { user } = useAuthStore();

  const handleDayPress = (dayNumber: number) => {
    const day = DAYS[dayNumber - 1];
    
    if (day.isLocked && user?.subscriptionTier === 'wanderer') {
      // Show paywall
      return;
    }

    navigation.navigate('DayDetail' as never, { dayNumber } as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Journey</Text>
        <View style={styles.stats}>
          <Text style={styles.statText}>Day {user?.currentDay || 1}</Text>
          <Text style={styles.statText}>🔥 {user?.streak || 0}</Text>
          <Text style={styles.statText}>✨ {user?.sparks || 0}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.grid}>
        {DAYS.map((day) => {
          const isCompleted = user?.completedDays.includes(day.dayNumber);
          const isCurrent = day.dayNumber === user?.currentDay;
          const isLocked = day.isLocked && user?.subscriptionTier === 'wanderer';

          return (
            <TouchableOpacity
              key={day.dayNumber}
              style={[
                styles.dayNode,
                isCompleted && styles.dayNodeCompleted,
                isCurrent && styles.dayNodeCurrent,
                isLocked && styles.dayNodeLocked,
              ]}
              onPress={() => handleDayPress(day.dayNumber)}
              disabled={isLocked}
            >
              <Text style={styles.dayNumber}>{day.dayNumber}</Text>
              {isCompleted && <Text style={styles.checkmark}>✓</Text>}
              {isLocked && <Text style={styles.lock}>🔒</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: 20,
  },
  statText: {
    fontSize: 18,
    color: '#10b981',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  dayNode: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2d2d2d',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3d3d3d',
  },
  dayNodeCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  dayNodeCurrent: {
    borderColor: '#f59e0b',
    borderWidth: 3,
  },
  dayNodeLocked: {
    opacity: 0.5,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  checkmark: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: 16,
  },
  lock: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    fontSize: 14,
  },
});
