import {apiGet} from "./client";

export function getCandidateByEmail(email){
    const encodedEmail = encodeURIComponent(email);
    return apiGet (`/api/candidate/get-by-email?email=${encodedEmail}`);
}