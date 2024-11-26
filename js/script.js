document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.hero__nav').classList.toggle('open');

    
    document.body.classList.toggle('no-scroll', document.querySelector('.hero__nav').classList.contains('open'));
});


const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1, 
    spaceBetween: 20, 
    loop: false, 
    pagination: {
        el: '.swiper-pagination',
        clickable: true, 
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
  
        375: {
            slidesPerView: 1, 
        },

        768: {
            slidesPerView: 2, 
        },

        1100: {
            slidesPerView: 3, 
        },
    },
});

// выпадашки //
document.querySelectorAll('.faq__item').forEach((item, index) => {

    if (index === 0) {
        item.classList.add('open');
    }

    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {

        document.querySelectorAll('.faq__item').forEach((el) => {
            if (el !== item) {
                el.classList.remove('open');
            }
        });


        item.classList.toggle('open');
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form__element");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 


        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); 

        try {
            
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            });

            if (response.ok) {
                console.log('Форма успешно отправлена:', data);
                alert("Форма успешно отправлена!"); 
                form.reset(); 
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