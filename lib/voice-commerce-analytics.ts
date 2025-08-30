import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIDGut_bYuABjD7sUazO8RuHuzZHQUwPg",
  authDomain: "saasbhoomi.firebaseapp.com",
  databaseURL: "https://saasbhoomi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "saasbhoomi",
  storageBucket: "saasbhoomi.firebasestorage.app",
  messagingSenderId: "49698065836",
  appId: "1:49698065836:web:6cf9984b11979ff27abe09",
  measurementId: "G-ZEP11E4Q69",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export interface VoiceCommerceMetrics {
  visited: number;           // Total unique visitors
  engaged: number;          // Users who spoke with AI (had conversations)
  qualified: number;        // Users who added to cart
  converted: number;        // Users who clicked checkout/buy now
  engagementRate: number;   // Engaged / Visited
  qualificationRate: number; // Qualified / Engaged
  conversionRate: number;   // Converted / Qualified
  totalRevenue: number;     // Total revenue from converted users
  avgSessionTime: number;   // Average session duration in seconds
  topSearchQueries: string[]; // Top 5 search queries
  cartAbandonment: number;  // Cart adds without checkout
  lastUpdated: Date;
}

export interface SessionData {
  ip: string;
  sessionStart: number;
  lastActivity: number;
  status: string;
  conversations?: Record<string, any>;
  cartInteractions?: Record<string, any>;
  searchQueries?: Record<string, any>;
  pageVisits?: Record<string, any>;
  toolCalls?: Record<string, any>;
  totalTimeSpent?: number;
}

// Calculate metrics from Firebase data
export async function calculateVoiceCommerceMetrics(): Promise<VoiceCommerceMetrics> {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'voice-commerce-sessions'));
    
    if (!snapshot.exists()) {
      return getEmptyMetrics();
    }
    
    const sessions = snapshot.val() as Record<string, SessionData>;
    
    // Initialize counters
    let visited = 0;
    let engaged = 0;
    let qualified = 0;
    let converted = 0;
    let totalSessionTime = 0;
    let activeSessionCount = 0;
    const searchQueries: Record<string, number> = {};
    let cartAdds = 0;
    let checkouts = 0;
    
    // Process each session
    Object.values(sessions).forEach((session) => {
      // Count visited (any session)
      visited++;
      
      // Count engaged (had conversations with AI)
      if (session.conversations && Object.keys(session.conversations).length > 0) {
        const hasUserInteraction = Object.values(session.conversations).some(
          (conv: any) => conv.type === 'user_voice' || conv.type === 'user_text' || conv.messageType === 'user_voice' || conv.messageType === 'user_text'
        );
        if (hasUserInteraction) {
          engaged++;
        }
      }
      
      // Count qualified (added to cart)
      if (session.cartInteractions && Object.keys(session.cartInteractions).length > 0) {
        const hasAddToCart = Object.values(session.cartInteractions).some(
          (interaction: any) => interaction.action === 'add' || interaction.action === 'add_to_cart'
        );
        if (hasAddToCart) {
          qualified++;
          cartAdds++;
        }
        
        // Count converted (clicked checkout or buy now)
        const hasCheckout = Object.values(session.cartInteractions).some(
          (interaction: any) => 
            interaction.action === 'checkout' || 
            interaction.action === 'checkout_click' || 
            interaction.action === 'buy_now_click' ||
            interaction.action === 'buy-now'
        );
        if (hasCheckout) {
          converted++;
          checkouts++;
        }
      }
      
      // Calculate session time
      if (session.totalTimeSpent && session.totalTimeSpent > 0) {
        totalSessionTime += session.totalTimeSpent;
        activeSessionCount++;
      } else if (session.sessionStart && session.lastActivity) {
        const duration = (session.lastActivity - session.sessionStart) / 1000; // Convert to seconds
        if (duration > 0 && duration < 86400) { // Exclude sessions > 24 hours (likely errors)
          totalSessionTime += duration;
          activeSessionCount++;
        }
      }
      
      // Collect search queries
      if (session.searchQueries) {
        Object.values(session.searchQueries).forEach((query: any) => {
          const q = query.query?.toLowerCase();
          if (q) {
            searchQueries[q] = (searchQueries[q] || 0) + 1;
          }
        });
      }
    });
    
    // Calculate rates
    const engagementRate = visited > 0 ? (engaged / visited) * 100 : 0;
    const qualificationRate = engaged > 0 ? (qualified / engaged) * 100 : 0;
    const conversionRate = qualified > 0 ? (converted / qualified) * 100 : 0;
    const avgSessionTime = activeSessionCount > 0 ? totalSessionTime / activeSessionCount : 0;
    const cartAbandonment = cartAdds > 0 ? ((cartAdds - checkouts) / cartAdds) * 100 : 0;
    
    // Get top 5 search queries
    const topSearchQueries = Object.entries(searchQueries)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([query]) => query);
    
    return {
      visited,
      engaged,
      qualified,
      converted,
      engagementRate: Math.round(engagementRate * 10) / 10,
      qualificationRate: Math.round(qualificationRate * 10) / 10,
      conversionRate: Math.round(conversionRate * 10) / 10,
      totalRevenue: converted * 150, // Placeholder - calculate from actual cart values
      avgSessionTime: Math.round(avgSessionTime),
      topSearchQueries,
      cartAbandonment: Math.round(cartAbandonment * 10) / 10,
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('Error calculating voice commerce metrics:', error);
    return getEmptyMetrics();
  }
}

// Real-time metrics subscription
export function subscribeToVoiceCommerceMetrics(callback: (metrics: VoiceCommerceMetrics) => void) {
  const sessionsRef = ref(database, 'voice-commerce-sessions');
  
  const unsubscribe = onValue(sessionsRef, async (snapshot) => {
    const metrics = await calculateVoiceCommerceMetrics();
    callback(metrics);
  });
  
  // Initial load
  calculateVoiceCommerceMetrics().then(callback);
  
  return unsubscribe;
}

// Get empty metrics object
function getEmptyMetrics(): VoiceCommerceMetrics {
  return {
    visited: 0,
    engaged: 0,
    qualified: 0,
    converted: 0,
    engagementRate: 0,
    qualificationRate: 0,
    conversionRate: 0,
    totalRevenue: 0,
    avgSessionTime: 0,
    topSearchQueries: [],
    cartAbandonment: 0,
    lastUpdated: new Date()
  };
}

// Get detailed session data
export async function getDetailedSessions(): Promise<SessionData[]> {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'voice-commerce-sessions'));
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const sessions = snapshot.val() as Record<string, SessionData>;
    return Object.values(sessions);
  } catch (error) {
    console.error('Error fetching detailed sessions:', error);
    return [];
  }
}

// Get recent conversations
export async function getRecentConversations(limit = 10): Promise<any[]> {
  try {
    const sessions = await getDetailedSessions();
    const conversations: any[] = [];
    
    sessions.forEach(session => {
      if (session.conversations) {
        Object.values(session.conversations).forEach((conv: any) => {
          conversations.push({
            ...conv,
            sessionIp: session.ip,
            sessionStart: session.sessionStart
          });
        });
      }
    });
    
    // Sort by timestamp and return most recent
    return conversations
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent conversations:', error);
    return [];
  }
}

// Get cart performance metrics
export async function getCartPerformanceMetrics() {
  try {
    const sessions = await getDetailedSessions();
    let totalCartValue = 0;
    let cartAdditions = 0;
    let checkoutClicks = 0;
    const productFrequency: Record<string, number> = {};
    
    sessions.forEach(session => {
      if (session.cartInteractions) {
        Object.values(session.cartInteractions).forEach((interaction: any) => {
          if (interaction.action === 'add' || interaction.action === 'add_to_cart') {
            cartAdditions++;
            if (interaction.productName) {
              productFrequency[interaction.productName] = (productFrequency[interaction.productName] || 0) + 1;
            }
            if (interaction.cartTotal?.amount) {
              totalCartValue = Math.max(totalCartValue, interaction.cartTotal.amount);
            }
          }
          if (interaction.action === 'checkout' || interaction.action === 'checkout_click') {
            checkoutClicks++;
          }
        });
      }
    });
    
    // Get top products
    const topProducts = Object.entries(productFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([product, count]) => ({ product, count }));
    
    return {
      totalCartValue,
      cartAdditions,
      checkoutClicks,
      topProducts,
      cartToCheckoutRate: cartAdditions > 0 ? (checkoutClicks / cartAdditions) * 100 : 0
    };
  } catch (error) {
    console.error('Error calculating cart performance:', error);
    return {
      totalCartValue: 0,
      cartAdditions: 0,
      checkoutClicks: 0,
      topProducts: [],
      cartToCheckoutRate: 0
    };
  }
}