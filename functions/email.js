import { env } from '$env/dynamic/private';


export async function sendEmail({ to, subject, text, html, redirectUrl }) {
  // const MAILHOP_USER = process?.env?.MAILHOP_USER || env?.MAILHOP_USER
  // const MAILHOP_PASS = process?.env?.MAILHOP_PASS || env?.MAILHOP_PASS
  
  // if (!MAILHOP_USER || !MAILHOP_PASS) {
  //   throw new Error('MAILHOP_USER and MAILHOP_PASS must be configured');
  // }

  // // Create base64 encoded credentials for Basic Auth
  // const rawString = `${MAILHOP_USER.trim()}:${MAILHOP_PASS.trim()}`;
  // // Use Buffer.from() without encoding parameter for exact match
  // // const credentials = Buffer.from(rawString).toString('base64');
  
  // XXX hard coding the credentials.  not sure why the base64 isn't working
  //  Seems the password passed in is not the actual password for some reason

  const credentials = 'XXX'

  // console.log('Raw auth string:', rawString);
  // console.log('Base64 credentials:', credentials);
  
  // Verify credentials match expected value
  // const expectedCredentials = btoa('beguelinsmtp:u7Sn#BX$u&3xRee');
  // if (credentials !== expectedCredentials) {
  //   console.error('Credential mismatch:', {
  //     generated: credentials,
  //     expected: expectedCredentials
  //   });
  // };

  const requestBody = {
    messages: [{
      from: { 
        name: "Selfie.pr",
        email: 'noreply@selfie.pr' 
      },
      to: [{ 
        email: to 
      }],
      subject,
      text,
      html
    }]
  };

  console.log('Sending email request:', {
    url: 'https://api.outbound.mailhop.org/v1/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`  // Send full credentials, only truncate in log
    },
    body: requestBody
  });

  const response = await fetch('https://api.outbound.mailhop.org/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`
    },
    body: JSON.stringify({
      messages: [{
        from: { 
          name: "Selfie.pr",
          email: 'noreply@selfie.pr' 
        },
        to: [{ 
          email: to 
        }],
        subject,
        text,
        html
      }]
    })
  });

  const responseText = await response.text();
  
  console.log('Email API response:', {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    body: responseText
  });
  
  if (!response.ok) {
    console.error('Email API error details:', {
      status: response.status,
      statusText: response.statusText,
      responseBody: responseText,
      sentCredentials: credentials
    });
    try {
      const error = JSON.parse(responseText);
      throw new Error(`Failed to send email: ${error.message}`);
    } catch (e) {
      throw new Error(`Failed to send email: Status ${response.status} - ${responseText}`);
    }
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    throw new Error(`Invalid JSON response: ${responseText}`);
  }
}
