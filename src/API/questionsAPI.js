const fetchQuestions = async (TOKEN) => {
  const URL = 'https://opentdb.com/api.php?amount=5&token=';
  const constructuredURL = `${URL}${TOKEN}`;
  const response = await fetch(constructuredURL);
  const json = await response.json();

  const RESPONSE_CODE_ERROR = 3;
  if (json.response_code === RESPONSE_CODE_ERROR) {
    return false;
  }
  return json.results;
};

export default fetchQuestions;
