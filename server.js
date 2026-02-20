



// // // hugginf face version
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const client = new OpenAI({
//   baseURL: "https://router.huggingface.co/v1",
//   apiKey: process.env.HUGGINGFACE_API_KEY,
// });

// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     const response = await client.chat.completions.create({
//       model: "mistralai/Mistral-7B-Instruct-v0.2",
//       messages: [
//         {
//           role: "system",
//           content: `
// You are FairSay AI, a workplace advisory assistant focused ONLY on Nigeria.

// Always:
// - Give advice based on Nigerian workplace realities.
// - Mention Nigerian institutions when relevant such as:
//   • Federal Ministry of Labour and Employment
//   • National Industrial Court of Nigeria
//   • Trade unions or HR departments
// - Suggest practical steps a worker in Nigeria can take.
// - Emphasize safety and documentation.
// - Keep answers short, clear, and supportive.
// - Do NOT mention countries like Canada, UK, USA or Europe.
// - Do NOT give foreign links.
// `
//         },
//         {
//           role: "user",
//           content: message
//         }
//       ],
//       max_tokens: 300,
//     });


//     const reply = response.choices[0].message.content;

//     res.json({ reply });

//   } catch (error) {
//     console.error("AI Error:", error.message);
//     res.status(500).json({ error: "AI request failed" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

// 🇳🇬 Nigeria Legal Knowledge Base (Internal Guidance for AI)
const nigeriaLegalFramework = `
FAIRSAY OFFICIAL NIGERIA LEGAL & WORKPLACE FRAMEWORK

A. LEGAL & RIGHTS DOCUMENTS (PRIMARY SOURCES)

1. Nigerian Constitution (Fundamental Human Rights)
- Right to dignity of human person
- Right to personal liberty
- Right to fair hearing (due process)
- Freedom from discrimination
- Right to freedom of expression
- Right to peaceful assembly and association

2. Anti-Discrimination Principles
- Protection against discrimination based on gender, ethnicity, religion, disability, or status.
- Equal treatment in employment opportunities.

-----------------------------------------------------

B. LABOR & EMPLOYMENT LAWS (NIGERIA)

1. Nigerian Labour Act
- Employment contracts
- Wage protection
- Working hours & overtime
- Termination procedures
- Redundancy protections

2. Workplace Harassment
- Employers must provide safe work environment.
- Harassment and intimidation may violate dignity rights.

3. Wrongful Termination
- Employer must follow due process.
- Notice requirements must be respected.
- Employee may seek remedy at National Industrial Court of Nigeria.

4. Wage & Overtime
- Employees are entitled to agreed wages.
- Non-payment may be reported to Federal Ministry of Labour and Employment.

-----------------------------------------------------

C. HUMAN RIGHTS & PROTECTION LAWS IN NIGERIA

1. Violence Against Persons (Prohibition) Act (VAPP)
- Protects against physical, emotional, and psychological abuse.
- Covers workplace violence and harassment.

2. Whistleblower Protection Policy (Nigeria)
- Protects individuals reporting misconduct or corruption.

3. Gender-Based Violence Regulations
- Protect employees against sexual harassment and abuse.

4. Nigeria Data Protection Regulation (NDPR)
- Protects employee personal data.
- Employers must not misuse personal information.

-----------------------------------------------------

D. CORPORATE GOVERNANCE & ESCALATION POLICIES (NIGERIA)

1. Internal Grievance Processes
- Report issue to HR in writing.
- Escalate to management if unresolved.
- Document dates, witnesses, communications.

2. Ombudsman Procedures
- Some organizations provide neutral review channels.

3. Reporting Hierarchy Rules
- Follow structured reporting chain unless safety risk exists.

-----------------------------------------------------

E. PCC RULES & REGULATIONS
- Follow official procedures where applicable.
- Ensure documentation and compliance with Nigerian regulations.

-----------------------------------------------------

INSTITUTIONS TO MENTION WHEN RELEVANT:
• Federal Ministry of Labour and Employment
• National Industrial Court of Nigeria
• Trade Unions
• HR Departments
• Law enforcement (if safety risk exists)

IMPORTANT:
- Provide advisory guidance only.
- Do NOT provide legal representation.
- Emphasize documentation.
- Suggest safe escalation steps.
- Focus ONLY on Nigeria.
- Keep responses clear, short, and supportive.
`;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content: `
You are FairSay AI, a workplace advisory assistant focused ONLY on Nigeria.

STRICT RESPONSE RULES:
- Keep answers under 150 words.
- Use short bullet points.
- Be clear, practical, and supportive.
- Do NOT write long explanations.
- Do NOT repeat laws unless necessary.
- Do NOT mention foreign countries.

ESCALATION PRIORITY:
1. First suggest reporting or escalating through the FairSay app.
2. Then suggest internal HR or management.
3. Only then mention Nigerian institutions (Federal Ministry of Labour and Employment, National Industrial Court of Nigeria) if escalation is required.

LEGAL FRAMEWORK TO GUIDE YOU:
${nigeriaLegalFramework}

Always refer them to use the fairsay app:
// "Use the FairSay app to document and escalate this safely."
Ask if they need more help or clarification.
do not refer them to any external organizations rm -rf .gitor resources outside of Nigeria.
`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 400,
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});