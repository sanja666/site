const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const spinButton = document.getElementById('spinButton');
const rouletteStrip = document.getElementById('rouletteStrip');
const rouletteResult = document.getElementById('rouletteResult');
const topupForm = document.getElementById('topupForm');
const withdrawForm = document.getElementById('withdrawForm');
const topupStatus = document.getElementById('topupStatus');
const withdrawStatus = document.getElementById('withdrawStatus');
const modal = document.getElementById('loadingModal');
const floatingNotification = document.getElementById('floatingNotification');
const closeNotification = document.getElementById('closeNotification');
const notificationText = document.getElementById('notificationText');
const rouletteTrack = document.getElementById('rouletteTrack');
const captchaText = document.getElementById('captchaText');
const refreshCaptcha = document.getElementById('refreshCaptcha');

const roulettePrizes = [
    { title: 'Минусовой кэшбэк -150%', description: 'Наслаждайтесь отрицательным балансом', type: 'bad' },
    { title: 'VIP-поддержка 1 минуту', description: 'Робот скажет «подождите»', type: 'bad' },
    { title: 'Промокод на задержку', description: '+14 дней к подключению', type: 'bad' },
    { title: 'Фантик «Суперприз»', description: 'Кажется, это жвачка', type: 'bad' },
    { title: 'Сверхскорость 7 Мбит/с', description: 'Только с 3:05 до 3:07 ночи', type: 'good' },
    { title: 'Плати больше — получи меньше', description: 'Подписка на удвоенный тариф', type: 'bad' },
    { title: 'Стабильное зависание', description: 'Зато предсказуемо', type: 'bad' },
    { title: 'Бесплатный роутер', description: 'Доставка за 29 999 ₽', type: 'bad' },
    { title: 'Призрак интернета', description: 'Скорость есть, но её не видно', type: 'good' },
    { title: 'Штраф за попытку выиграть', description: 'Нам нужны средства на призы', type: 'bad' }
];

function createRoulette() {
    const fragment = document.createDocumentFragment();
    [...roulettePrizes, ...roulettePrizes].forEach((prize) => {
        const div = document.createElement('div');
        div.className = `prize ${prize.type}`;
        div.innerHTML = `<h4>${prize.title}</h4><span>${prize.description}</span>`;
        fragment.appendChild(div);
    });
    rouletteStrip.innerHTML = '';
    rouletteStrip.appendChild(fragment);
}

function toggleNav() {
    navLinks.classList.toggle('open');
}

function showModal() {
    modal.classList.add('active');
}

function hideModal() {
    modal.classList.remove('active');
}

function randomDelay(min = 1200, max = 3200) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulateProcessing(element, message, isSuccess = true) {
    showModal();
    setTimeout(() => {
        hideModal();
        element.className = `form-status ${isSuccess ? 'success' : 'error'}`;
        element.textContent = message;
    }, randomDelay());
}

function updateTopupDetails(method) {
    const detailBlocks = document.querySelectorAll('.topup-details');
    detailBlocks.forEach(block => {
        block.classList.toggle('hidden', block.dataset.method !== method);
        block.querySelectorAll('input, textarea').forEach(input => {
            if (block.dataset.method === method) {
                input.removeAttribute('disabled');
                if (input.hasAttribute('required')) {
                    input.setAttribute('required', '');
                }
            } else {
                input.setAttribute('disabled', '');
                if (input.hasAttribute('required')) {
                    input.removeAttribute('required');
                }
            }
        });
    });
}

function generateCaptcha() {
    const base = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
        text += base.charAt(Math.floor(Math.random() * base.length));
    }
    captchaText.textContent = text.split('').map(letter => Math.random() > 0.5 ? letter.toLowerCase() : letter).join(' ');
}

function spinRoulette() {
    spinButton.disabled = true;
    const prizeWidth = rouletteTrack.offsetWidth / 3;
    const targetIndex = Math.random() > 0.8 ? Math.floor(Math.random() * roulettePrizes.length) : 0;
    const randomLoops = 3 + Math.floor(Math.random() * 2);
    const offset = (targetIndex + roulettePrizes.length) * 180;
    const translateX = -(offset + Math.random() * 60 + randomLoops * prizeWidth);

    rouletteStrip.style.transition = 'transform 4.5s cubic-bezier(0.16, 0.84, 0.44, 1)';
    rouletteStrip.style.transform = `translateX(${translateX}px)`;

    setTimeout(() => {
        const finalIndex = targetIndex % roulettePrizes.length;
        const prize = roulettePrizes[finalIndex];
        rouletteResult.textContent = `Поздравляем! Выпал приз: «${prize.title}». ${prize.description}.`;
        if (prize.type === 'good') {
            rouletteResult.textContent += ' Но, к сожалению, доставка призов приостановлена.';
        } else {
            rouletteResult.textContent += ' Уже списали с вашего счёта скрытую комиссию.';
        }
        rouletteStrip.style.transition = 'none';
        rouletteStrip.style.transform = 'translateX(0)';
        spinButton.disabled = false;
    }, 4700);
}

function rotateNotification() {
    const messages = [
        'Подключите тариф «Комета 5 Мбит/с» и получите шанс на минусовой кэшбек!',
        'Внимание! Вы самый близкий к джекпоту, который мы готовы обнулить.',
        'Раздача бонусов: пополните счёт на 9999 ₽ и мы подумаем над подарком.',
        'Новый тариф «Последний эфир»: платите за рекламу, смотрите рекламу!',
        'Доступно обновление роутера. Стоимость установки: 14999 ₽ в час.'
    ];
    let index = 0;
    setInterval(() => {
        index = (index + 1) % messages.length;
        notificationText.textContent = messages[index];
    }, 6000);
}

function handleTopup(event) {
    event.preventDefault();
    simulateProcessing(topupStatus, 'Платёж одобрен! Мы уже потратили ваши средства.', true);
    event.target.reset();
    updateTopupDetails('card');
}

function handleWithdraw(event) {
    event.preventDefault();
    const captchaInput = event.target.querySelector('input[name="captcha"]').value.replace(/\s+/g, '').toUpperCase();
    const expected = captchaText.textContent.replace(/\s+/g, '').toUpperCase();
    if (captchaInput !== expected) {
        withdrawStatus.className = 'form-status error';
        withdrawStatus.textContent = 'Капча неверна. Попробуйте ещё раз, оплата за попытку уже списана.';
        generateCaptcha();
        return;
    }
    const penaltyMessages = [
        'Ошибка 402: необходимо доплатить комиссию за комиссию.',
        'Запрос отправлен на ручную проверку. Ожидайте 90-180 рабочих лун.',
        'Не хватает подтверждений. Загрузите 12-е фото паспорта.',
        'Вывод временно невозможен: космическая буря в дата-центре.'
    ];
    simulateProcessing(withdrawStatus, penaltyMessages[Math.floor(Math.random() * penaltyMessages.length)], false);
    event.target.reset();
    generateCaptcha();
}

function initWalletForm() {
    const methodSelect = topupForm.querySelector('select[name="method"]');
    methodSelect.addEventListener('change', (event) => {
        updateTopupDetails(event.target.value);
    });
    updateTopupDetails(methodSelect.value);
}

function initNav() {
    navToggle.addEventListener('click', toggleNav);
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

function initRoulette() {
    createRoulette();
    spinButton.addEventListener('click', spinRoulette);
}

function initNotifications() {
    closeNotification.addEventListener('click', () => floatingNotification.classList.add('hidden'));
    rotateNotification();
}

function initCaptcha() {
    generateCaptcha();
    refreshCaptcha.addEventListener('click', generateCaptcha);
}

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initRoulette();
    initWalletForm();
    initNotifications();
    initCaptcha();
    topupForm.addEventListener('submit', handleTopup);
    withdrawForm.addEventListener('submit', handleWithdraw);
});
