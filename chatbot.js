const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#user-input input');
const sendButton = document.querySelector('#user-input button');
const saveAnswers = document.querySelector('#saveAnswers');
const Modalbox = document.querySelector('#modalbox');

const apiKey = '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';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

let i = 0;

$("#startbtn").on("click", function (e) {
    $("#start").hide();
    $("#qna").show();

});

function addMessage(sender, message) {
    const messageElement = document.createElement('span');
    if (i == 1) messageElement.className = 'me-message';
    else messageElement.className = 'chat-message';
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.prepend(messageElement);
}


async function fetchAIResponse(prompt) {
    // API 요청에 사용할 옵션을 정의
    const requestOptions = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 사용할 AI 모델
            messages: [{
                role: "user", // 메시지 역할을 user로 설정
                content: prompt // 사용자가 입력한 메시지
            },],
            temperature: 0.8, // 모델의 출력 다양성
            max_tokens: 512, // 응답받을 메시지 최대 토큰(단어) 수 설정
            top_p: 1, // 토큰 샘플링 확률을 설정
            frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
            presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
            stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
        }),
    };
    // API 요청후 응답 처리
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}
// 전송 버튼 클릭 이벤트 처리
sendButton.addEventListener('click', async () => {
    // 사용자가 입력한 메시지
    const message = userInput.value.trim();
    // 메시지가 비어있으면 리턴
    if (message.length === 0) return;
    // 사용자 메시지 화면에 추가
    i++;
    addMessage('나', message);
    userInput.value = '';
    //ChatGPT API 요청후 답변을 화면에 추가
    const aiResponse = await fetchAIResponse(message);
    i--;
    addMessage('🤖선생봇', aiResponse);
});
// 사용자 입력 필드에서 Enter 키 이벤트를 처리
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

saveAnswers.addEventListener('click', async () => {
    // 사용자가 입력한 메시지
    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    const question3 = document.getElementById('question3').value;
    const question4 = document.getElementById('question4').value;
    const question5 = document.getElementById('question5').value;

    const answers = question4 + "관계인 " + question1 + "성 " + question2 + "에게 선물을 하려는데 목적은 " + question5 + "야 " + question3 + " 정도의 예산을 가지고 있어 150자 넘지말고 선물과 이유를 간단하게 세가지만 추천해줘";
    $("#modal").show();
    $("#qna").hide();

    const modalTitle = document.createElement('div');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = `${question4}관계인 ${question2} ${question1}성에게 ${question5} 목적으로 ${question3}상당의 선물을 준비하고 싶으시군요! `;
    Modalbox.prepend(modalTitle);
    const aiResponse = await fetchAIResponse(answers);
    const modalElement = document.createElement('div');
    modalElement.className = 'modal-contents';
    modalElement.textContent = `${aiResponse}`;
    Modalbox.append(modalElement);
    console.log(aiResponse);

});

$("#modal-close").on("click", function (e) {
    $("#modal").hide();
    $("#qna").show();
    const div = document.querySelector('.modal-title');
    div.remove();
    const div2 = document.querySelector('.modal-contents');
    div2.remove();

});

$('#gotochatbot').on("click", function (e) {
    $("#modal").hide();
    $("#chat-container").show();
    addMessage("선생봇", "안녕하세요 선생봇을 찾아주셔서 감사합니다!");
    addMessage("선생봇", "무엇을 도와드릴까요?");

});

// 사용자 입력 필드에서 Enter 키 이벤트를 처리
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
$('#restart').on("click", function (e) {
    $("#modal").hide();
    $("#qna").hide();
    $("#chat-container").hide();
    $("#start").show();

});
