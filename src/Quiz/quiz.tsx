import { useEffect, useState } from "react";
import "../Quiz/quiz.css";

interface Question {
    id: number;
    question: string;
    answers: {
        id: number;
        answer: string;
        isCorrect: boolean;
    }[];
}

export default function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [finalScore, setFinalScore] = useState<number>(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    //récupérer les questions ainsi que les réponses correspondantes
    useEffect(() => {
        fetch("/environment_questions")
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
                console.log(data)
            });
    }, []);

    const handleAnswerSelect = (questionId: number, answerId: number) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answerId,

        }));
    };

    //permet de calculer le nombre de points total et de l'afficher lorsque je clique sur le bouton
    const handleSubmit = () => {
        fetch("/calculate_score_environment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedAnswers),
        })
            .then((response) => response.json())
            .then((data) => {
                setFinalScore(data.score);
            })
            .catch((error) => {
                console.error("Error calculating score:", error);
            });
        setIsSubmitted(true)

    };


    return (
        <div className="App">
            <div className="allCardsAk">
                <h1 data-testid="titleQuiz" className="titleQuiz">Teste tes connaissances sur l'environnement</h1>
                {questions.map((question: Question) => (
                    <div className="cardAsk" key={question.id}>
                        <h3 className="titleAnswer">{question.question}</h3>
                        <ul>
                            {question.answers.map((answer) => {
                                return (
                                    <li className="listAnswer" key={answer.id}>
                                        <label className="answer">
                                            <input
                                                type="radio"
                                                value={answer.id}
                                                name={`question_${question.id}`}
                                                onChange={() => handleAnswerSelect(question.id, answer.id)}
                                            />
                                            {answer.answer}
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="boxRight">
                <button className="btnSubmit" onClick={handleSubmit}>Envoyer</button>
                {isSubmitted && <p className="score">Tu as fait {finalScore} points !</p>}
                <div className="linkOtherQuiz">
                    <a className="textLink" href="/autres-quiz">Passe un autre quiz pour découvrir comment tu peux
                        aider à protéger l'environnement</a>
                </div>
            </div>
        </div>
    );
}
