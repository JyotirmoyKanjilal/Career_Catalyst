'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, MapPin, Lock, Eye, EyeOff, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAppContext } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import Navbar from '../../components/Navbar';

// Validation schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  city: Yup.string(),
  currentPassword: Yup.string().when('newPassword', {
    is: val => val && val.length > 0,
    then: schema => schema.required('Current password is required to set a new password'),
    otherwise: schema => schema
  }),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, updateProfile, logout } = useAppContext();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug authentication state
  useEffect(() => {
    console.log('Auth State:', { isAuthenticated, loading, user });
    console.log('Token:', localStorage.getItem('token'));
  }, [isAuthenticated, loading, user]);

  // Redirect if not authenticated after loading is complete
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login');
        router.push('/login');
      } else {
        console.log('User is authenticated:', user);
      }
    }
  }, [isAuthenticated, loading, router, user]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for update
      const updateData = {
        name: values.name,
        email: values.email,
        city: values.city
      };
      
      // Add password update if provided
      if (values.newPassword) {
        updateData.currentPassword = values.currentPassword;
        updateData.newPassword = values.newPassword;
      }
      
      // Call update profile function
      const result = await updateProfile(updateData);
      
      if (result.success) {
        toast.success('Profile updated successfully');
        // Reset password fields
        resetForm({
          values: {
            ...values,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
        });
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating your profile');
      console.error('Profile update error:', error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070F12] text-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A3A9]"></div>
        </div>
      </div>
    );
  }

  // Show a message if not authenticated but somehow got past the redirect
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070F12] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-6">You need to be logged in to view this page.</p>
          <Link 
            href="/login"
            className="px-4 py-2 bg-[#00A3A9] hover:bg-[#008C8B] text-white rounded-md transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Show a message if user data is missing
  if (!user) {
    return (
      <div className="min-h-screen bg-[#070F12] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">User Data Not Found</h1>
          <p className="mb-6">There was a problem loading your profile data.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#00A3A9] hover:bg-[#008C8B] text-white rounded-md transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070F12] text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#00A3A9] hover:text-[#008C8B] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Your Profile</h1>
              <p className="mt-1 text-gray-400">Manage your account settings and preferences</p>
            </div>
            {user?.role && (
              <div className="px-3 py-1 bg-[#00A3A9]/20 text-[#00A3A9] text-sm font-medium rounded-full border border-[#00A3A9]/30">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            )}
          </div>
        </div>
        
        <Card className="bg-[#003B46]/50 border-[#006770]/30 text-white shadow-xl">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription className="text-gray-400">Update your personal details</CardDescription>
          </CardHeader>
          
          <Formik
            initialValues={{
              name: user.name || '',
              email: user.email || '',
              city: user.city || '',
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            }}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, values }) => (
              <Form>
                <CardContent className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="pl-10 bg-[#002A33] border-[#006770]/50 text-white placeholder:text-gray-500 focus:border-[#00A3A9] focus:ring-[#00A3A9]/20"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  {/* Rest of the form fields remain the same */}
                  {/* ... */}
                  
                </CardContent>
                
                <CardFooter className="flex justify-between border-t border-[#006770]/30 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogout}
                    className="border-red-500 text-red-500 hover:bg-red-500/10"
                  >
                    Logout
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="bg-[#00A3A9] hover:bg-[#008C8B] text-white"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
}