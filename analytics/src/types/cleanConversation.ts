// export interface SingleData {
//     demographicInfo: {
//         Age: string, 
//         Gender:  string, 
//         studyLevel: string,
//         fieldOfStudy: string, 
//         studyExpenceSource: string,
//         householdIncome:string,
//         guardianEmployment: string 
//         hasDependents: string,
//         growingArea: string,
//     },
//     depressionLevel: number // 0. Normal, 1. Mild,  2. Borderline, 3. Moderate, 4. Severe, 5. Extreme.
// }

export interface SingleData {
    demographicInfo: {
        Age: "Under 18" | "18 - 20" | "21 - 24" | "25 - 30" | "Over 30", 
        Gender:  "Male" | "Female", 
        studyLevel: "School" | "College" | "Undergraduate" | "Graduate" | "Postgraduate",
        fieldOfStudy: "Arts and Humanities" | "Social Sciences" | "Natural Sciences" | "Engineering and Technology" | "Business and Economics" | "Medical and Health Sciences", 
        studyExpenceSource: "Personal savings" | "Family support" | "Scholarships" |"Student loans" | "Part-time job",
        householdIncome: "Less than Tk. 50,000" |"Tk. 50,000 - Tk. 100,000" | "Tk. 100,000 - Tk. 300,000" | "More than 300,000",
        guardianEmployment: "Both parents/guardians employed full-time" |
        "One parent/guardian employed full-time" |
        "Both parents/guardians employed part-time" |
        "Both parents/guardians retired" |
        "One or both parents/guardians unemployed", 
        hasDependents: "Yes" | "No",
        growingArea: "Urban (city)" | "Suburban (town/mufassil)" | "Rural (village)" 
    },
    depressionLevel: 0 | 1 | 2 | 3 | 4 | 5;
    timeToComplete: number; // in seconds
    feedback: number[];

}