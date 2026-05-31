import { groq } from "next-sanity"

// Add your GROQ queries here
export const exampleQuery = groq`*[_type == "post"]`
