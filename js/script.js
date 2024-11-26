document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.hero__nav').classList.toggle('open');

    // Переключаем класс no-scroll
    document.body.classList.toggle('no-scroll', document.querySelector('.hero__nav').classList.contains('open'));
});


const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1, // По умолчанию показываем 1 слайд
    spaceBetween: 20, // Задаем расстояние между слайдами
    loop: false, // Отключаем бесконечный цикл
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Делаем точки кликабельными
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // Мобильные устройства
        375: {
            slidesPerView: 1, // Показываем 1 слайд
        },
        // Планшеты
        768: {
            slidesPerView: 2, // Показываем 2 слайда
        },
        // Десктопы
        1100: {
            slidesPerView: 3, // Показываем 3 слайда
        },
    },
});

// выпадашки //
document.querySelectorAll('.faq__item').forEach((item, index) => {
    // Оставляем открыт первой элемент по умолчанию
    if (index === 0) {
        item.classList.add('open');
    }

    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
        // Закрываем все элементы
        document.querySelectorAll('.faq__item').forEach((el) => {
            if (el !== item) {
                el.classList.remove('open');
            }
        });

        // Переключаем состояние текущего элемента
        item.classList.toggle('open');
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form__element");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Отключить стандартное поведение формы

        // Собираем данные формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Преобразуем FormData в объект

        try {
            // Отправка данных на мокап-сервер
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Преобразуем данные в JSON
            });

            if (response.ok) {
                console.log('Форма успешно отправлена:', data);
                alert("Форма успешно отправлена!"); // Показываем сообщение об успехе
                form.reset(); // Сбрасываем форму
            } else {
                console.error('Ошибка при отправке формы:', response.statusText);
                alert("Ошибка при отправке формы. Попробуйте снова.");
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert("Произошла ошибка. Проверьте подключение к сети.");
        }
    });
});