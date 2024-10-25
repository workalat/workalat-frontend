import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LinkedInCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLinkedInCallback = async () => {
      // Get the authorization code from the query string
      const code = router.query.code as string;
      const error = router.query.error;
      console.log(code);
      console.log(error);

    //   if (error) {
    //     // Handle error from LinkedIn login
    //     console.error('LinkedIn Login Error: ', error);
    //     // Redirect or show an error message
    //     router.push('/professional/signup');
    //     return;
    //   }

    //   if (!code) {
    //     // If no code is found, redirect to signup
    //     console.error('Authorization code missing');
    //     router.push('/professional/signup');
    //     return;
    //   }

    //   try {
    //     // Exchange the authorization code for an access token
    //     const { data } = await axios.post('/api/linkedin-token-exchange', {
    //       code,
    //     });

    //     const accessToken = data.access_token;

    //     if (accessToken) {
    //       // Fetch user's profile and email using the access token
    //       await fetchLinkedInProfile(accessToken);
    //       await fetchLinkedInEmail(accessToken);

    //       // After successfully getting the user's LinkedIn data, you can redirect
    //       router.push('/professional/signup/complete-profile');
    //     }
    //   } catch (error) {
    //     console.error('Error exchanging code for token: ', error);
    //     // Handle token exchange error
    //     router.push('/professional/signup');
    //   }
    };

    handleLinkedInCallback();
  }, [router]);

//   const fetchLinkedInProfile = async (accessToken: string) => {
//     try {
//       const { data } = await axios.get(
//         'https://api.linkedin.com/v2/me',
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       console.log('LinkedIn Profile: ', data);
//       // Process the LinkedIn profile data and save it as needed
//     } catch (error) {
//       console.error('Error fetching LinkedIn profile: ', error);
//     }
//   };

//   const fetchLinkedInEmail = async (accessToken: string) => {
//     try {
//       const { data } = await axios.get(
//         'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       console.log('LinkedIn Email: ', data);
//       // Process the LinkedIn email data and save it as needed
//     } catch (error) {
//       console.error('Error fetching LinkedIn email: ', error);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center">
//       <h1 className="text-xl font-bold">Processing LinkedIn login...</h1>
//     </div>
//   );
};

export default LinkedInCallback;
