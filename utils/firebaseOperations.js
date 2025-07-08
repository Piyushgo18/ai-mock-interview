import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  where, 
  query, 
  orderBy, 
  setDoc 
} from 'firebase/firestore';

// Mock Interview Operations
export const createMockInterview = async (mockInterviewData) => {
  try {
    const docRef = await addDoc(collection(db, 'mockInterviews'), {
      ...mockInterviewData,
      // Add server timestamp for precise tracking, but keep the original createdAt
      serverCreatedAt: new Date().toISOString()
    });
    return { id: docRef.id, ...mockInterviewData };
  } catch (error) {
    console.error('Error creating mock interview:', error);
    console.error('Error details:', error.message);
    throw error;
  }
};

export const getMockInterviewById = async (mockId) => {
  try {
    // Search by mockId field in the documents
    const q = query(
      collection(db, 'mockInterviews'), 
      where('mockId', '==', mockId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting mock interview:', error);
    throw error;
  }
};

export const getMockInterviewsByUser = async (userEmail) => {
  try {
    // Simple query without orderBy to avoid index requirement
    const q = query(
      collection(db, 'mockInterviews'), 
      where('createdBy', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    
    const interviews = [];
    querySnapshot.forEach((doc) => {
      interviews.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort on the client side by createdAt (newest first)
    interviews.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Descending order (newest first)
    });
    
    return interviews;
  } catch (error) {
    console.error('Error getting user mock interviews:', error);
    throw error;
  }
};

// User Answer Operations
export const saveUserAnswer = async (answerData) => {
  try {
    const docRef = await addDoc(collection(db, 'userAnswers'), {
      ...answerData,
      createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...answerData };
  } catch (error) {
    console.error('Error saving user answer:', error);
    throw error;
  }
};

export const getUserAnswersByMockId = async (mockId) => {
  try {
    // Simple query without orderBy to avoid index requirement
    const q = query(
      collection(db, 'userAnswers'), 
      where('mockId', '==', mockId)
    );
    const querySnapshot = await getDocs(q);
    
    const answers = [];
    querySnapshot.forEach((doc) => {
      answers.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort on the client side by createdAt (oldest first for interview flow)
    answers.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB; // Ascending order (oldest first)
    });
    
    return answers;
  } catch (error) {
    console.error('Error getting user answers:', error);
    throw error;
  }
};

export const updateUserAnswer = async (answerId, updateData) => {
  try {
    const docRef = doc(db, 'userAnswers', answerId);
    await updateDoc(docRef, updateData);
    return { id: answerId, ...updateData };
  } catch (error) {
    console.error('Error updating user answer:', error);
    throw error;
  }
};

// Delete operations (if needed)
export const deleteMockInterview = async (mockId) => {
  try {
    await deleteDoc(doc(db, 'mockInterviews', mockId));
    return true;
  } catch (error) {
    console.error('Error deleting mock interview:', error);
    throw error;
  }
};

export const deleteUserAnswer = async (answerId) => {
  try {
    await deleteDoc(doc(db, 'userAnswers', answerId));
    return true;
  } catch (error) {
    console.error('Error deleting user answer:', error);
    throw error;
  }
};

// User Subscription Operations
export const updateUserSubscription = async (userId, subscriptionData) => {
  try {
    if (!userId) {
      return false;
    }

    const userRef = doc(db, 'userSubscriptions', userId);
    await updateDoc(userRef, {
      ...subscriptionData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating user subscription:', error);
    
    // If it's a permission error or document doesn't exist, try to create it
    if (error.code === 'permission-denied' || error.code === 'not-found' || error.message.includes('permissions')) {
      try {
        const userRef = doc(db, 'userSubscriptions', userId);
        await setDoc(userRef, {
          ...subscriptionData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        return true;
      } catch (createError) {
        console.error('Error creating user subscription:', createError);
        // Still return true to not break the payment flow
        return true;
      }
    }
    
    // For other errors, still return true to not break the payment flow
    return true;
  }
};

export const getUserSubscription = async (userId) => {
  try {
    if (!userId) {
      return {
        plan: 'free',
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: null
      };
    }

    const userRef = doc(db, 'userSubscriptions', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // Return default free plan if no subscription exists
      return {
        plan: 'free',
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: null
      };
    }
  } catch (error) {
    console.error('Error getting user subscription:', error);
    
    // If it's a permission error, return default subscription instead of throwing
    if (error.code === 'permission-denied' || error.message.includes('permissions')) {
      return {
        plan: 'free',
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: null
      };
    }
    
    // For other errors, still return default but log the error
    return {
      plan: 'free',
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: null
    };
  }
};

export const createUserSubscription = async (userId, subscriptionData) => {
  try {
    const userRef = doc(db, 'userSubscriptions', userId);
    await setDoc(userRef, {
      ...subscriptionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error creating user subscription:', error);
    throw error;
  }
};

export const checkUserSubscription = async (userId) => {
  try {
    const subscription = await getUserSubscription(userId);
    
    if (subscription.plan === 'free') {
      return { isActive: true, plan: 'free' };
    }
    
    if (subscription.plan === 'pro') {
      const endDate = new Date(subscription.endDate);
      const now = new Date();
      
      if (endDate > now) {
        return { isActive: true, plan: 'pro', endDate: subscription.endDate };
      } else {
        // Subscription expired, downgrade to free
        await updateUserSubscription(userId, {
          plan: 'free',
          status: 'expired',
          endDate: new Date().toISOString()
        });
        return { isActive: true, plan: 'free', expired: true };
      }
    }
    
    return { isActive: false, plan: 'free' };
  } catch (error) {
    console.error('Error checking user subscription:', error);
    return { isActive: true, plan: 'free' }; // Default to free plan on error
  }
};
