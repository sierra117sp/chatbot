let messages = [];
let isTyping = false;

const responses = {
    'hola': '¡Hola! ¿Cómo estás?',
    'hi': '¡Hola! ¿Cómo estás?',
    'buenos días': '¡Buenos días! Espero que tengas un excelente día.',
    'buenas tardes': '¡Buenas tardes! ¿En qué puedo ayudarte?',
    'buenas noches': '¡Buenas noches! ¿Hay algo en lo que pueda asistirte?',
    'adiós': '¡Adiós! Que tengas un buen día.',
    'hasta luego': '¡Hasta luego! Nos vemos pronto.',
    'bye': '¡Adiós! Que tengas un buen día.',
    'cómo estás': 'Estoy bien, gracias por preguntar. ¿Y tú cómo estás?',
    'qué puedes hacer': 'Puedo responder a tus preguntas básicas, ayudarte con saludos y mantener una conversación amigable.',
    'ayuda': 'Estoy aquí para ayudarte. Puedes preguntarme sobre mi funcionalidad o simplemente charlar conmigo.',
    'gracias': '¡De nada! Siempre estoy aquí para ayudarte.',
    'quién eres': 'Soy tu asistente virtual, creado para ayudarte y responder tus preguntas.',
    'cómo te llamas': 'Soy tu asistente virtual. Puedes llamarme como prefieras.',
    'qué hora es': 'Lo siento, no tengo acceso a la hora actual. Te recomiendo revisar tu reloj o dispositivo.',
    'cuál es tu propósito': 'Mi propósito es asistirte y responder a tus preguntas de la mejor manera posible.',
    'default': 'Interesante. ¿Podrías ser más específico? Estoy aquí para ayudarte con tus preguntas.'
};


const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function scrollToBottom() {
    const container = document.querySelector('.messages-container');
    container.scrollTop = container.scrollHeight;
}

function generateBotResponse(userMessage) {
    const normalizedMessage = userMessage.toLowerCase().trim();
    if (responses[normalizedMessage]) {
        return responses[normalizedMessage];
    }
    for (const key in responses) {
        if (normalizedMessage.includes(key) || key.includes(normalizedMessage)) {
            return responses[key];
        }
    }
     return responses['default'];
}

function createMessageElement(text, isUser, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = `message-avatar ${isUser ? 'user' : 'bot'}`;
    
    const avatarIcon = document.createElement('div');
    avatarIcon.className = 'message-avatar-icon';
    avatarIcon.textContent = isUser ? '👤' : '🤖';
    avatarDiv.appendChild(avatarIcon);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `message-bubble ${isUser ? 'user' : 'bot'}`;
    bubbleDiv.textContent = text;
    bubbleDiv.setAttribute('data-testid', `text-message-${Date.now()}`);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = timestamp;
    
    contentDiv.appendChild(bubbleDiv);
    contentDiv.appendChild(timeDiv);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    return messageDiv;
}

function addMessage(text, isUser) {
    const timestamp = getCurrentTime();
    const messageElement = createMessageElement(text, isUser, timestamp);
    
    messagesContainer.appendChild(messageElement);
    
    messages.push({
        id: Date.now().toString(),
        text: text,
        isUser: isUser,
        timestamp: timestamp
    });
    
    setTimeout(scrollToBottom, 100);
}

function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    isTyping = true;
    setTimeout(scrollToBottom, 100);
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
    isTyping = false;
}

function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') {
        return;
    }
    
    addMessage(message, true);
    
    messageInput.value = '';
    updateSendButton();
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = generateBotResponse(message);
        addMessage(botResponse, false);
    }, Math.random() * 1000 + 500); 
}

function updateSendButton() {
    const hasText = messageInput.value.trim().length > 0;
    sendBtn.disabled = !hasText;
}

function selectSuggestion(suggestion) {
    messageInput.value = suggestion;
    
    setTimeout(() => {
        addMessage(suggestion, true);
        messageInput.value = '';
        updateSendButton();
        
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = generateBotResponse(suggestion);
            addMessage(botResponse, false);
        }, Math.random() * 1000 + 500);
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addMessage('¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', false);
    }, 500);
    
    messageInput.focus();
    
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
    
    messageInput.addEventListener('input', updateSendButton);
    
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const suggestion = this.getAttribute('data-suggestion');
            selectSuggestion(suggestion);
        });
    });
    
    document.getElementById('emoji-btn').addEventListener('click', function() {
        messageInput.focus();
    });
    
    updateSendButton();
});


function clearChat() {
    messagesContainer.innerHTML = '';
    messages = [];
    setTimeout(() => {
        addMessage('¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', false);
    }, 500);
}

function exportChatHistory() {
    const chatHistory = messages.map(msg => `[${msg.timestamp}] ${msg.isUser ? 'Usuario' : 'Bot'}: ${msg.text}`).join('\n');
    console.log('Historial del chat:', chatHistory);
    return chatHistory;
}

