import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // todos in the body of the post request
    const {todos} = await request.json();
    console.log(todos, "hey in api");

    //communicate with openAI GPT
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `When responding, welcome the user as Mr.Barry and say welcome to the Todo App! Limit the response to 200 characters`,
            },
            {
                role: "user",
                content: `Hi, there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(todos)}`,
            }
        ],
    });

    const {data} = response;

    console.log("DATA is : ", data);
    console.log("DATA CHOICES is : ", data.choices);

    return NextResponse.json(data.choices[0].message);

}