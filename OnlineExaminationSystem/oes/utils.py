from nltk.corpus import wordnet
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize


def is_positive(sentence):
    return sentence.count('not') == 0 and sentence.count("n't") == 0


def synonym_antonym_extractor(phrase, synonyms, antonyms):
    for syn in wordnet.synsets(phrase):
        for l in syn.lemmas():
            synonyms.append(l.name())
            if l.antonyms():
                antonyms.append(l.antonyms()[0].name())


def get_synonym_antonym_list(phrase, synonyms, antonyms):
    synonyms.append(phrase)
    synonym_antonym_extractor(
        phrase=phrase, synonyms=synonyms, antonyms=antonyms)

    synonyms_of_antonyms = [] + antonyms
    for word in antonyms:
        synonym_antonym_extractor(
            phrase=word, synonyms=synonyms_of_antonyms, antonyms=[])
    for word in synonyms_of_antonyms:
        antonyms.append(word)


# synonyms = []
# antonyms = []
# get_synonym_antonym_list('rational', synonyms, antonyms)

# print(set(synonyms))
# print(set(antonyms))


def lemmatize_list(list_of_words):
    lemmatizer = WordNetLemmatizer()
    for i in range(len(list_of_words)):
        list_of_words[i] = lemmatizer.lemmatize(list_of_words[i])


def is_correct_answer(question, expected_answer, provided_answer):

    question = question.lower()
    provided_answer = provided_answer.lower()
    expected_answer = expected_answer.lower()

    is_positive_expected = is_positive(expected_answer)
    is_positive_provided = is_positive(provided_answer)
    tokenized_question = word_tokenize(
        question, language='english', preserve_line=False)

    tokenized_expected_answer = word_tokenize(
        expected_answer, language='english', preserve_line=False)

    tokenized_provided_answer = word_tokenize(
        provided_answer, language='english', preserve_line=False)

    lemmatize_list(tokenized_question)
    lemmatize_list(tokenized_provided_answer)
    lemmatize_list(tokenized_expected_answer)

    stop_words = stopwords.words('english')
    stop_words = stop_words + tokenized_question
    tokenized_expected_answer = list(set(
        tokenized_expected_answer) - set(stop_words))
    tokenized_provided_answer = list(set(
        tokenized_provided_answer) - set(stop_words))

    # print(tokenized_expected_answer, tokenized_provided_answer)
    aggreement = ['yes', 'yup', 'true', 'yeah', 'oh yes', 'correct',
                  'accurate', '100 percent', 'valid', 'positive', 'of course', 'ok', 'okay']
    disagreement = ['no', 'nope', 'false', 'nay', 'oh no', 'incorrect', 'inaccurate',
                    'wrong', 'untrue', 'invalid', 'negative', 'of course not', 'not okay']

    if len(set([expected_answer]) & set(aggreement)) > 0:
        return len(set([provided_answer]) & set(aggreement)) > 0

    if len(set([expected_answer]) & set(disagreement)) > 0:
        return len(set([provided_answer]) & set(disagreement)) > 0

    expected_synonyms = []
    expected_antonyms = []

    provided_synonyms = []
    provided_antonyms = []

    for word in tokenized_expected_answer:
        synonyms = []
        antonyms = []
        get_synonym_antonym_list(word, synonyms, antonyms)
        lemmatize_list(synonyms)
        lemmatize_list(antonyms)
        expected_synonyms.append(set(synonyms))
        expected_antonyms.append(set(antonyms))

    for word in tokenized_provided_answer:
        synonyms = []
        antonyms = []
        get_synonym_antonym_list(word, synonyms, antonyms)
        lemmatize_list(synonyms)
        lemmatize_list(antonyms)
        provided_synonyms.append(set(synonyms))
        provided_antonyms.append(set(antonyms))

    # expected_synonyms = set(expected_synonyms)
    # expected_antonyms = set(expected_antonyms)
    # provided_synonyms = set(provided_synonyms)
    # provided_antonyms = set(provided_antonyms)

    # print(expected_synonyms, provided_synonyms)

    # print(expected_synonyms, provided_synonyms)
    if (is_positive_expected ^ is_positive_provided) == 0:
        result1 = True
        result2 = True

        for expected_set in expected_synonyms:
            flag = False
            for provided_set in provided_synonyms:
                if len(expected_set & provided_set) > 0:
                    flag = True
                    break
            if not flag:
                result1 = False
                break

        for expected_set in expected_antonyms:
            flag = False
            for provided_set in provided_antonyms:
                if len(expected_set & provided_set) > 0:
                    flag = True
                    break
            if not flag:
                result2 = False
                break

        return result1 or result2

    else:
        result1 = True
        result2 = True

        for expected_set in expected_synonyms:
            flag = False
            for provided_set in provided_antonyms:
                if len(expected_set & provided_set) > 0:
                    flag = True
                    break
            if not flag:
                result1 = False
                break

        for expected_set in expected_antonyms:
            flag = False
            for provided_set in provided_synonyms:
                if len(expected_set & provided_set) > 0:
                    flag = True
                    break
            if not flag:
                result2 = False
                break

        return result1 or result2
