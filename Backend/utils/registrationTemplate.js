const registrationTemplate = (fullName, T_ID, username) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 10px;
      }

      .header {
        text-align: center;
        background: #111827;
        color: white;
        padding: 15px;
        border-radius: 8px 8px 0 0;
      }

      .content {
        padding: 20px;
        color: #333;
      }

      .box {
        background: #f9fafb;
        padding: 15px;
        border-radius: 8px;
        margin-top: 15px;
      }

      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #666;
      }

      .btn {
        display: inline-block;
        margin-top: 15px;
        padding: 10px 20px;
        background: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }

      .links a {
        margin: 0 10px;
        text-decoration: none;
        color: #2563eb;
      }
    </style>
  </head>

  <body>

    <div class="container">

      <div class="header">
        <h2>Techofes 79</h2>
        <p>Aurora - Colours of Creativity</p>
      </div>

      <div class="content">

        <h3>Hello ${fullName},</h3>

        <p>
          Thank you for registering @techofes.saasceg.in</b>
        </p>

        <div class="box">

          <h4>Your Details</h4>

          <p><b>Name:</b> ${fullName}</p>

          <p><b>T_ID:</b> ${T_ID}</p>

          <p><b>Username:</b> ${username}</p>

        </div>

        <p>
          Please keep your <b>T_ID</b> safe. You will need it during the fest.
        </p>

        <center>
          <a href="https://techofes.saasceg.in" class="btn">
            Visit Website
          </a>
        </center>

      </div>


      <div class="footer">

        <p>
         © Student Association and Arts Society
        </p>

        <div style="margin-top:20px; text-align:center;">

  <table align="center" cellpadding="0" cellspacing="0">
    <tr>

      <!-- Website -->
      <td style="padding:8px 12px;">
        <a href="https://saasceg.in"
           style="
             text-decoration:none;
             font-family:Arial, sans-serif;
             font-size:14px;
             color:#ffffff;
             background:#4f46e5;
             padding:10px 16px;
             border-radius:6px;
             display:inline-block;
           ">
          🌐 Website
        </a>
      </td>

      <!-- Instagram -->
      <td style="padding:8px 12px;">
        <a href="https://www.instagram.com/techofes_official/"
           style="
             text-decoration:none;
             font-family:Arial, sans-serif;
             font-size:14px;
             color:#ffffff;
             background:#e1306c;
             padding:10px 16px;
             border-radius:6px;
             display:inline-block;
           ">
          📸 Instagram
        </a>
      </td>

      <!-- Contact -->
      <td style="padding:8px 12px;">
        <a href="mailto:saascegc@gmail.com"
           style="
             text-decoration:none;
             font-family:Arial, sans-serif;
             font-size:14px;
             color:#ffffff;
             background:#10b981;
             padding:10px 16px;
             border-radius:6px;
             display:inline-block;
           ">
          ✉ Contact
        </a>
      </td>

    </tr>
  </table>

</div>

        <p>
          For technical queries - techsaas26@gmail.com
        </p>

      </div>

    </div>

  </body>
  </html>
  `;
};

export default registrationTemplate;
