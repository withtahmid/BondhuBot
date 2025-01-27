import { depressionTypeFromScore } from ".";
import Conversation, { ConversationSchema } from "../../../backend/models/Conversation";
import { SingleData } from "../types/cleanConversation";


// interface SingleData {
//     demographicInfo: {
//         age: "Under 18" | "18 - 20" | "21 - 24" | "25 - 30" | "Over 30", 
//         gender:  "Male" | "Female", 
//         studyLevel: "School" | "College" | "Undergraduate" | "Graduate" | "Postgraduate",
//         fieldOfStudy: "Arts and Humanities" | "Social Sciences" | "Natural Sciences" | "Engineering and Technology" | "Business and Economics" | "Medical and Health Sciences", 
//         studyExpenceSource: "Personal savings" | "Family support" | "Scholarships" |"Student loans" | "Part-time job",
//         householdIncome: "Less than Tk. 50,000" |"Tk. 50,000 - Tk. 100,000" | "Tk. 100,000 - Tk. 300,000" | "More than 300,000",
//         guardianEmployment: "Both parents/guardians employed full-time" |
//         "One parent/guardian employed full-time" |
//         "Both parents/guardians employed part-time" |
//         "Both parents/guardians retired" |
//         "One or both parents/guardians unemployed", 
//         hasDependents: "Yes" | "No",
//         growingArea: "Urban (city)" | "Suburban (town/mufassil)" | "Rural (village)" 
//     },
//     depressionLevel: 0 | 1 | 2 | 3 | 4 | 5 // 0. Normal, 1. Mild,  2. Borderline, 3. Moderate, 4. Severe, 5. Extreme.
// }



// interface SingleData {
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

type AllData = SingleData[];

export const cleanData = (conversations: ConversationSchema[]) => {
    conversations = conversations.filter(c => c.isFinished)
    if(conversations.length === 0){
        return [] as AllData;
    }
    const data: AllData = [];
//    if(conversations.length){
//     conversations[0].demographicInfos.forEach(c => {
//         console.log(c.key);
//     })
//    }
    conversations.forEach(con => {
        const singledata:SingleData = {
            demographicInfo: {
                Age: "Under 18",
                Gender:  "Male", 
                studyLevel: "School",
                fieldOfStudy: "Arts and Humanities", 
                studyExpenceSource: "Personal savings",
                householdIncome: "Less than Tk. 50,000" ,
                guardianEmployment: "Both parents/guardians employed full-time", 
                hasDependents: "Yes",
                growingArea: "Urban (city)" 
            },
            depressionLevel: depressionTypeFromScore(con.obtainedScore),
            timeToComplete: (Math.min(60 * 20,(con.endTime - con.startTime) / 1000)) / 60,
            feedback: con.feedback,
        }

        con.demographicInfos.forEach(info => {
            if (info.key in singledata.demographicInfo) {
                singledata.demographicInfo[info.key as keyof typeof singledata.demographicInfo] = info.selected as never;
            }
        });
        data.push(singledata);
    });
    console.log(data[0].feedback);
    return data;
}