import formatTodosForGPT from "./formatTodosForGPT";

const fetchSuggestionsFromGPT = async(board: Board) => {
    const todos = formatTodosForGPT(board);
    console.log("todos are: ", todos)
    const response = await fetch('/api/generateSummary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({todos}),
    });
    const GPTdata = await response.json();
    const {content} = GPTdata;
    return content;
}

export default fetchSuggestionsFromGPT;