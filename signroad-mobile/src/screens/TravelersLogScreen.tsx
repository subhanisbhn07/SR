import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { signAPI, journalAPI, SignLog, JournalEntry } from '../services/api';

export default function TravelersLogScreen() {
  const [signs, setSigns] = useState<SignLog[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [signsData, journalData] = await Promise.all([
        signAPI.getUserSigns(),
        journalAPI.getUserEntries(),
      ]);
      setSigns(signsData);
      setJournal(journalData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Traveler's Log</Text>
        <Text style={styles.subtitle}>Your journey of signs and reflections</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Signs Found ({signs.length})</Text>
        {signs.length === 0 ? (
          <Text style={styles.emptyText}>No signs logged yet</Text>
        ) : (
          signs.map((sign) => (
            <View key={sign.id} style={styles.card}>
              <Text style={styles.cardDay}>Day {sign.day_number}</Text>
              <Text style={styles.cardTitle}>{sign.sign_name}</Text>
              {sign.note && <Text style={styles.cardNote}>{sign.note}</Text>}
              <Text style={styles.cardDate}>
                {new Date(sign.logged_at).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 Journal Entries ({journal.length})</Text>
        {journal.length === 0 ? (
          <Text style={styles.emptyText}>No journal entries yet</Text>
        ) : (
          journal.map((entry) => (
            <View key={entry.id} style={styles.card}>
              <Text style={styles.cardDay}>Day {entry.day_number}</Text>
              <Text style={styles.cardContent}>{entry.content}</Text>
              <Text style={styles.cardDate}>
                {new Date(entry.created_at).toLocaleDateString()}
              </Text>
            </View>
          ))
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardDay: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardNote: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 24,
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#6b7280',
  },
});
