function emailRegister(email: string): string {
  return `

  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Welcome to Our Help Desk - Account Registration Successful!</title>
  
      <style type="text/css">

      body {
        font-family: "Helvetica Neue", sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #181143;
      }

      .wrapper {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }

      h1 {
        color: #181143;
        font-size: 36px;
        text-align: center;
        margin-bottom: 20px;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      ul {
        margin-left: 10px;
        margin-bottom: 20px;
      }

      li {
        font-size: 16px;
        line-height: 1.6;
      }

      .button-link {
        display: inline-block;
        background-color: #181143;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 30px;
        font-size: 18px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }

      .button-link:hover {
        background-color: #181143;
      }

      .footer-socialLinks {
        text-align: center;
        display:flex;
        justify-content: center;
        gap: 20px;
        margin:auto;
      }

      .footer-socialLink {
        display: inline-block;
        margin: 0 auto;
      }

      .footer-socialLinkImage {
        width: 40px;
        height: 40px;
      }

      .footer-socialLinks  img{
        width: 48px;
      }

      .footer-text {
        font-size: 14px;
        color: #787c84;
        margin-top: 20px;
        text-align: center;
      }

      @media (max-width: 480px) {
        h1 {
          font-size: 30px;
        }

        p {
          font-size: 16px;
        }

        .button-link {
          font-size: 16px;
          padding: 8px 16px;
        }

        .footer-text {
          font-size: 12px;
        }
      }
    </style>
    </head>
  
    <body>
      <div class="wrapper">
        <h1>Welcome to Help Desk</h1>
        <p>
        We are delighted to inform you that your registration was successful. Welcome to our community of valued clients!
        </p>
        <h2>Here are the important details about your account:</h2>
        <ul>
          <li><strong>Email Address:</strong> ${email}</li>
          <li><strong>Account Type:</strong> USER </li>
        </ul>
        <h2>User Agent Details:</h2>
        <ul>
          <li><strong>Device:</strong> PC</li>
          <li><strong> Platform:</strong> Windows</li>
          <li><strong>Operating System:</strong> Windows 10</li>
          <li><strong>Browser:</strong> Chrome</li>
        </ul>
  
        <p>
        Your account is currently pending approval. Rest assured that once approved, you will gain full access to our app comprehensive features and resources.
        </p>
        <p>
        At HelpDesk, we take security and privacy of your information seriously. Your data is encrypted and protected with advanced security measures to ensure confidentiality. We adhere to strict data protection protocols, so you can trust that your information is safe .
        </p>
        <p>
          If you have any urgent concerns or questions, feel free to contact our
          dedicated support team at  <b>Support Email :</b> hello@shifti.co / <b>Phone Number </b> : +216 20 28 69 66  . We are here to
          assist you and provide solutions to any issues you may encounter.
        </p>
    

        <div class="footer-socialLinks">
          <a href="https://www.facebook.com/Shiftitn" class="footer-socialLink"
            >
            <img src="https://img.icons8.com/?size=192&id=118497&format=png" alt="Facebook Icon"/> 
            </a>
          <a href="https://www.linkedin.com/company/shiftii/" class="footer-socialLink"
            >
              
            <img src="https://img.icons8.com/?size=192&id=114445&format=png" alt="Website Icon"/>
            </a>
          <a href="https://shifti.co/" class="footer-socialLink"
            >
              
            <img src="https://img.icons8.com/?size=192&id=VJz2Ob51dvZJ&format=png" alt="LinkedIn Icon"/>
            </a>
        </div>
        <p class="footer-text">
           <strong>Email :</strong> hello@shifti.co
           |
         <strong>Phone :</strong> +216 20 28 69 66
         <br/>
          <strong>Address :</strong> Résidence El Badr, Avenue Hédi Nouira, Ariana 2037, Tunisie

          <br />
        </p>
      </div>
    </body>
  </html>
  `;
}
export { emailRegister };
