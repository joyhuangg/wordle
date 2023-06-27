const fetchWordEndpoint = `https://random-word-api.vercel.app/api?words=1&length=5`
const validateWordEndpoint = `https://api.dictionaryapi.dev/api/v2/entries/en_US/`

export function getWord(): Promise<Response> {
  return fetch(fetchWordEndpoint)
}

export function validateWord(word: string): Promise<Response> {
  return fetch(validateWordEndpoint + word)
}
