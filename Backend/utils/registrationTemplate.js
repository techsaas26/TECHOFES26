const registrationTemplate = (fullName, T_ID, username) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .header { text-align: center; background: #111827; color: white; padding: 15px; border-radius: 8px 8px 0 0; }
      .content { padding: 20px; color: #333; line-height: 1.6; }
      .box { background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 15px; }
      
      /* Rules Styling */
      .rules-section { margin-top: 25px; padding: 15px; border-left: 4px solid #4f46e5; background: #eef2ff; border-radius: 4px; }
      .rule-item { margin-bottom: 12px; display: flex; align-items: flex-start; }
      .rule-title { font-weight: bold; color: #4f46e5; display: block; margin-bottom: 2px; }
      
      .footer { margin-top: 20px; text-align: center; font-size: 13px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
      .btn { display: inline-block; margin-top: 15px; padding: 12px 25px; background: #4f46e5; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h2 style="margin:0;">Techofes 79</h2>
        <p style="margin:5px 0 0 0;">Aurora - Colours of Creativity</p>
      </div>

      <div class="content">
        <h3>Hello ${fullName},</h3>
        <p>Thank you for registering at <b>techofes.saasceg.in</b>. We are excited to have you with us!</p>

        <div class="box">
          <h4 style="margin-top:0; color:#111827;">Your Registration Details</h4>
          <p style="margin: 5px 0;"><b>Name:</b> ${fullName}</p>
          <p style="margin: 5px 0;"><b>T_ID:</b> <span style="color:#4f46e5; font-family: monospace; font-size: 1.1em;">${T_ID}</span></p>
          <p style="margin: 5px 0;"><b>Username:</b> ${username}</p>
        </div>

        <p style="margin-top:20px;">
          Please keep your <b>T_ID</b> safe. You will be required to present it at the entry gates and during various events of the fest.
        </p>

        <center>
          <a href="https://techofes.saasceg.in" class="btn">Visit Website</a>
        </center>
      </div>

      <div class="rules-section">
          <h4 style="margin-top:0; color: #1e1b4b; border-bottom: 1px solid #c7d2fe; padding-bottom: 8px; margin-bottom: 12px;">
            ⚠️ Important Guidelines
          </h4>
          
          <ul style="padding-left: 20px; margin: 0; color: #374151;">
            <li style="margin-bottom: 15px;">
              <strong style="color: #4f46e5; display: block; margin-bottom: 2px;">Restroom Facilities</strong>
              Restrooms are available at designated blocks near the <b>Main gallery</b> (for proshows), <b>Vivekanandha Auditorium</b> & <b>Red building</b> (during day events). Please follow the directional signage provided on campus.
            </li>

            <li>
              <strong style="color: #4f46e5; display: block; margin-bottom: 2px;">Campus Exit Procedure</strong>
              <ul style="padding-left: 18px; margin-top: 5px; list-style-type: circle;">
                <li style="margin-bottom: 5px;">
                  <b>Other College Students:</b> Attendees must check out at the main security gate.
                </li>
                <li>
                  <b>CEG Students:</b> Attendees must check in before hostel timings.
                </li>
              </ul>
              <p style="margin-top: 8px; font-size: 13px; color: #ef4444;">
                <i>* Ensure you have your <b>T_ID</b> ready for verification before leaving the campus premises.</i>
              </p>
            </li>
          </ul>
        </div>

      <div class="footer">
        <p>© Student Association and Arts Society (SAAS)</p>
        
        <table align="center" cellpadding="0" cellspacing="0" style="margin-top:15px;">
          <tr>
            <td style="padding:5px 8px;"><a href="https://saasceg.in" style="text-decoration:none; font-size:12px; color:#ffffff; background:#4f46e5; padding:8px 12px; border-radius:4px; display:inline-block;">🌐 Website</a></td>
            <td style="padding:5px 8px;"><a href="https://www.instagram.com/techofes_official/" style="text-decoration:none; font-size:12px; color:#ffffff; background:#e1306c; padding:8px 12px; border-radius:4px; display:inline-block;">📸 Instagram</a></td>
            <td style="padding:5px 8px;"><a href="mailto:saascegc@gmail.com" style="text-decoration:none; font-size:12px; color:#ffffff; background:#10b981; padding:8px 12px; border-radius:4px; display:inline-block;">✉ Contact</a></td>
          </tr>
        </table>

        <p style="font-size:11px; margin-top:15px;">
          For technical queries: <a href="mailto:techsaas26@gmail.com" style="color:#4f46e5;">techsaas26@gmail.com</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export default registrationTemplate;