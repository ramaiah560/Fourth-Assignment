document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const typeFilter = document.getElementById('typeFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionCreationModal = document.getElementById('questionCreationModal');
    const closeModalBtn = document.querySelector('.modal .close');
    const questionForm = document.getElementById('questionForm');
    const importBtn = document.getElementById('importBtn');
    const exportBtn = document.getElementById('exportBtn');

    const questions = [
        { id: 1, text: 'What is 2 + 2?', type: 'multipleChoice', difficulty: 'easy', category: 'math', tags: ['addition'] },
        { id: 2, text: 'Explain the theory of relativity.', type: 'essay', difficulty: 'hard', category: 'science', tags: ['relativity'] },
        // Add more sample questions as needed
    ];

    const updateQuestionList = () => {
        questionsContainer.innerHTML = '';
        const filteredQuestions = questions
            .filter(q => {
                return (typeFilter.value === '' || q.type === typeFilter.value) &&
                       (difficultyFilter.value === '' || q.difficulty === difficultyFilter.value) &&
                       (categoryFilter.value === '' || q.category === categoryFilter.value) &&
                       (searchBar.value === '' || q.text.toLowerCase().includes(searchBar.value.toLowerCase()));
            })
            .map(q => {
                return `
                    <li id="question-${q.id}">
                        <p><strong>${q.text}</strong></p>
                        <p>Type: ${q.type}</p>
                        <p>Difficulty: ${q.difficulty}</p>
                        <p>Category: ${q.category}</p>
                        <p>Tags: ${q.tags.join(', ')}</p>
                        <button onclick="editQuestion(${q.id})">Edit</button>
                        <button onclick="deleteQuestion(${q.id})">Delete</button>
                    </li>
                `;
            }).join('');
        questionsContainer.innerHTML = filteredQuestions;
    };

    const showModal = () => {
        questionCreationModal.style.display = 'block';
    };

    const closeModal = () => {
        questionCreationModal.style.display = 'none';
    };

    const addQuestion = (event) => {
        event.preventDefault();
        const newQuestion = {
            id:
