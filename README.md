# BondhuBot

BondhuBot is a chatbot-based system developed to address the growing mental health challenges, particularly focusing on early detection of depression among university students in Bangladesh. Leveraging advanced Natural Language Processing (NLP) and the Beck Depression Inventory (BDI), this project aims to provide a conversational and accessible interface to help users assess their mental health.

---


## Features

- **Early Depression Detection**: Utilizes the Beck Depression Inventory (BDI) to assess and classify depression levels (mild, moderate, or severe).
- **Conversational Interface**: A non-intrusive chatbot using Google's Gemini Pro Large Language Model (LLM) for empathetic and contextual user interaction.
- **Personalized Reports**: Provides users with detailed visual reports and recommendations for professional mental health resources.
- **Privacy Focused**: Ensures anonymity by not storing personal or identifiable user data.
- **Scalable Design**: Built using the MERN stack for high performance, scalability, and reliability.

---

## Technology Stack

### Frontend:
- React.js (TypeScript)
- TailwindCSS with DaisyUI for styling
- Redux Toolkit for state management

### Backend:
- Node.js with Express.js
- tRPC for type-safe communication
- Zod for data validation

### Database:

- MongoDB Atlas
- Mongoose for schema management

### Core Features:
- **LLM Integration**: Google Gemini Pro for NLP capabilities
- **Cloud Hosting**: Scalable cloud solutions for real-time interaction

---

## Uses:
The web app is live at `https://bondhubot.netlify.app/`


## Installation and Setup

1. **Clone the repository**:
```bash   
    git clone https://github.com/yourusername/BondhuBot.git   
    cd BondhuBot
```
2. **Install dependencies**:
- Backend:
```bash
    cd backend && npm install
```
- Frontend:
```bash
    cd frontend && npm install
```
3. **Environment Variables**:
   Set up a `.env` file with the following keys:   
```env   
    MONGODB_URI=""
    GEMINI_API_KEY=""
    ADMIN_KEY=""   
```
4. **Run the application**:   
- Backend:
```bash
    cd backend && npm run dev
```
- Frontend:
```bash
    cd frontend && npm run dev
```
5. Access the application at `http://localhost:3000`.

---

## Usage
- Users interact with BondhuBot through a simple and empathetic chatbot interface.
- The chatbot guides users through a set of 21 questions derived from the Beck Depression Inventory.
- Responses are analyzed, and a personalized report is generated, highlighting the user's mental health condition.

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository.**
2. **Create a feature branch:**
```bash   
git checkout -b feature-name  
```
3. **Commit your changes:**
```bash   
   git commit -m "<Add feature-name>"
```
4. **Push to your fork:**
```bash
   git push origin feature-name   
```
5. **Submit a pull request.**

---

## Future Enhancements
- **Bengali Language Support**: Expanding support for local languages to enhance accessibility.
- **Broader Mental Health Scope**: Including screening for conditions like anxiety and PTSD.
- **Real-Time Crisis Intervention**: Integration with mental health hotlines and emergency services.
- **Enhanced Data Privacy**: Implementing encryption and compliance with GDPR standards.

---

## Authors

The project was built from the ground up by:

- **[Md Tahmid Ahmed Rakib](https://github.com/withtahmid)**
- **[Sarowar Alam Minhaj](https://github.com/sarwar76200)**
- **[Mashiyat Nayeem](https://github.com/meshiyet)** 


---

## Acknowledgements

- Faculty Advisor: [Dr. Sifat Momen, North South University](https://ece.northsouth.edu/people/dr-sifat-momen/)
- [Beck Depression Inventory (BDI)](https://www.ismanet.org/doctoryourspirit/pdfs/Beck-Depression-Inventory-BDI.pdf)
- [Google's Gemini Pro LLM](https://deepmind.google/technologies/gemini/pro/)

---

For any queries or suggestions, please contact us at [your email here].