import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';

// Replace with your Stripe publishable key in production
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PlanOption {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const plans: PlanOption[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9,
    features: [
      '5 PDF exports per month',
      'Basic templates',
      'Market trends (weekly updates)'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    features: [
      'Unlimited PDF exports',
      'All premium templates',
      'Market trends (daily updates)',
      'Advanced keyword research'
    ],
    popular: true
  },
  {
    id: 'business',
    name: 'Business',
    price: 79,
    features: [
      'Everything in Professional',
      'Team collaboration',
      'Real-time market analytics',
      'Priority support'
    ]
  }
];

const CheckoutForm: React.FC<{ selectedPlan: PlanOption }> = ({ selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setLoading(true);
    setError(null);

    // In a real implementation, you would create a payment intent on your server
    // and return the client secret to complete the payment on the client side
    
    try {
      // Simulate API call to create payment intent
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Simulate successful payment
      // In production, you would use stripe.confirmCardPayment with the client secret
      setSuccess(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">Subscription Successful!</h3>
        <p className="text-green-700 mb-4">
          Thank you for subscribing to the {selectedPlan.name} plan. Your account has been upgraded.
        </p>
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => window.location.href = '/editor'}
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Information
        </label>
        <div className="border border-gray-300 rounded-md p-4 bg-white">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={currentUser?.email || ''}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-md">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subscription ({selectedPlan.name})</span>
          <span>${selectedPlan.price}/month</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
          <span>Total</span>
          <span>${selectedPlan.price}/month</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Subscribe for $${selectedPlan.price}/month`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
        You will be charged ${selectedPlan.price} monthly until you cancel your subscription.
      </p>
    </form>
  );
};

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(plans[1]); // Default to Professional plan

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Subscription Plan</h1>
            <p className="text-gray-600">
              Select the plan that best fits your needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white p-6 rounded-lg shadow-md border-2 transition-all ${
                  selectedPlan.id === plan.id ? 'border-blue-500 transform scale-105' : 'border-transparent'
                } ${plan.popular ? 'relative' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-2 px-4 rounded transition-colors ${
                    selectedPlan.id === plan.id
                      ? 'bg-blue-600 text-white'
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {selectedPlan.id === plan.id ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Complete Your Subscription</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm selectedPlan={selectedPlan} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
