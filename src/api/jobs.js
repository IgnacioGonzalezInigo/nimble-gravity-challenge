// GET para obtener posiciones disponibles
import { apiGet } from "./client";

export function getJobsList (){
    return apiGet("/api/jobs/get-list")
}